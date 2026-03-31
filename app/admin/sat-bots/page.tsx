'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { Bot, Edit2, ImagePlus, Plus, Trash2, Upload, X } from 'lucide-react'

interface SatBotPost {
  id: string
  title: string
  content: string
  imageUrl: string | null
  published: boolean
  createdAt: string
  updatedAt: string
}

const initialFormData = {
  title: '',
  content: '',
  imageUrl: ''
}

function getContentPreview(content: string) {
  if (content.length <= 120) {
    return content
  }

  return `${content.slice(0, 120)}...`
}

export default function SatBotsPage() {
  const [posts, setPosts] = useState<SatBotPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [selectedPost, setSelectedPost] = useState<SatBotPost | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const response = await fetch('/api/admin/sat-bots')

      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('[SatBots] Error fetching:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function resetDialogState() {
    setSelectedPost(null)
    setFormData(initialFormData)
    setIsDragOver(false)
    setUploadError('')
    setIsUploadingImage(false)
  }

  function openCreateDialog() {
    resetDialogState()
    setIsDialogOpen(true)
  }

  function openEditDialog(post: SatBotPost) {
    setSelectedPost(post)
    setUploadError('')
    setIsDragOver(false)
    setFormData({
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl ?? ''
    })
    setIsDialogOpen(true)
  }

  async function uploadImage(file: File) {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file.')
      return
    }

    if (!supabase) {
      setUploadError('Supabase is not configured. Add the public URL and anon key to continue.')
      return
    }

    setIsUploadingImage(true)
    setUploadError('')

    try {
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const baseName = file.name
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 40) || 'sat-bot'
      const filePath = `posts/${Date.now()}-${crypto.randomUUID()}-${baseName}.${extension}`

      const { error } = await supabase.storage
        .from('sat-bots')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        })

      if (error) {
        throw error
      }

      const { data } = supabase.storage.from('sat-bots').getPublicUrl(filePath)

      setFormData((current) => ({
        ...current,
        imageUrl: data.publicUrl
      }))
    } catch (error) {
      console.error('[SatBots] Error uploading image:', error)
      setUploadError('Image upload failed. Please verify the sat-bots bucket and try again.')
    } finally {
      setIsUploadingImage(false)
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (file) {
      void uploadImage(file)
    }

    event.target.value = ''
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragOver(true)
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragOver(false)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragOver(false)

    const file = event.dataTransfer.files?.[0]

    if (file) {
      void uploadImage(file)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isUploadingImage) {
      return
    }

    setIsSaving(true)

    const payload = {
      title: formData.title,
      content: formData.content,
      imageUrl: formData.imageUrl
    }

    try {
      const response = await fetch(
        selectedPost ? `/api/admin/sat-bots/${selectedPost.id}` : '/api/admin/sat-bots',
        {
          method: selectedPost ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to save post')
      }

      const savedPost = await response.json()

      setPosts((currentPosts) => {
        if (selectedPost) {
          return currentPosts.map((post) =>
            post.id === savedPost.id ? savedPost : post
          )
        }

        return [savedPost, ...currentPosts]
      })

      setIsDialogOpen(false)
      resetDialogState()
    } catch (error) {
      console.error('[SatBots] Error saving:', error)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this S.A.T Bot post?')) return

    try {
      const response = await fetch(`/api/admin/sat-bots/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id))
      }
    } catch (error) {
      console.error('[SatBots] Error deleting:', error)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0A1628]">S.A.T Bots</h1>
              <p className="mt-2 text-sm text-gray-500">Manage trading bot updates, images, and text posts.</p>
            </div>
            <Button
              onClick={openCreateDialog}
              className="bg-[#1A4FBF] hover:bg-[#1A4FBF]/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Post
            </Button>
          </div>

          {isLoading ? (
            <div className="py-8 text-center">Loading...</div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                <Bot className="mb-4 h-10 w-10 text-gray-300" />
                <p className="text-base font-medium text-[#0A1628]">No S.A.T Bot posts yet</p>
                <p className="mt-2 text-sm text-gray-500">Create the first update to start publishing trading bot content.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell className="max-w-md text-sm text-gray-600">
                          {getContentPreview(post.content)}
                        </TableCell>
                        <TableCell>
                          {post.imageUrl ? (
                            <a
                              href={post.imageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-[#1A4FBF] hover:underline"
                            >
                              View image
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">No image</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={post.published ? 'default' : 'outline'}>
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(post)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)

              if (!open) {
                resetDialogState()
              }
            }}
          >
            <DialogContent className="border-black/10 bg-[#FAFAFA] text-[#0A0A0A] sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-['Syne'] text-2xl font-black tracking-tight">
                  {selectedPost ? 'Edit S.A.T Bot Post' : 'Add S.A.T Bot Post'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({ ...formData, title: event.target.value })
                  }
                  required
                />
                <Textarea
                  placeholder="Content"
                  value={formData.content}
                  onChange={(event) =>
                    setFormData({ ...formData, content: event.target.value })
                  }
                  className="min-h-32"
                  required
                />
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => {
                      if (!isUploadingImage) {
                        fileInputRef.current?.click()
                      }
                    }}
                    className={`relative overflow-hidden rounded-[1.75rem] border-2 border-dashed bg-white p-5 transition-all duration-300 ${
                      isDragOver
                        ? 'border-[#C8F135] shadow-[0_0_0_4px_rgba(200,241,53,0.16)]'
                        : 'border-black/10 hover:border-[#C8F135]'
                    } ${isUploadingImage ? 'cursor-wait' : 'cursor-pointer'}`}
                  >
                    {formData.imageUrl ? (
                      <div className="space-y-4">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[#FAFAFA]">
                          <Image
                            src={formData.imageUrl}
                            alt={formData.title || 'S.A.T Bot upload preview'}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 640px, 100vw"
                          />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8F135] text-[#0A0A0A]">
                              <ImagePlus className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-['Syne'] text-lg font-bold text-[#0A0A0A]">
                                Image uploaded
                              </p>
                              <p className="text-sm text-[#0A0A0A]/55">
                                Drop a new file or click to replace it.
                              </p>
                            </div>
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            onClick={(event) => {
                              event.stopPropagation()
                              setFormData((current) => ({ ...current, imageUrl: '' }))
                            }}
                            className="border-black/10 bg-white text-[#0A0A0A] hover:bg-[#FAFAFA]"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-[#FAFAFA] text-[#0A0A0A]">
                          <Upload className="h-7 w-7" />
                        </div>
                        <p className="font-['Syne'] text-2xl font-black tracking-tight text-[#0A0A0A]">
                          Upload a premium visual
                        </p>
                        <p className="mt-3 max-w-md text-sm leading-6 text-[#0A0A0A]/58">
                          Drag and drop an image here, or click to browse. The border shifts to lime green when the file is ready to land.
                        </p>
                        <p className="mt-5 font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-[0.24em] text-[#0A0A0A]/42">
                          JPG · PNG · WEBP
                        </p>
                      </div>
                    )}

                    {isUploadingImage ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#FAFAFA]/92 backdrop-blur-sm">
                        <Spinner className="h-8 w-8 text-[#0A0A0A]" />
                        <p className="font-['Syne'] text-lg font-bold text-[#0A0A0A]">
                          Processing image...
                        </p>
                        <p className="text-sm text-[#0A0A0A]/55">
                          Uploading to Supabase Storage
                        </p>
                      </div>
                    ) : null}
                  </div>

                  {uploadError ? (
                    <p className="text-sm text-red-500">{uploadError}</p>
                  ) : null}
                </div>
                <Button
                  type="submit"
                  disabled={isSaving || isUploadingImage}
                  className="h-12 w-full bg-[#0A0A0A] font-semibold text-white hover:bg-[#C8F135] hover:text-[#0A0A0A]"
                >
                  {isSaving ? 'Saving...' : isUploadingImage ? 'Uploading image...' : selectedPost ? 'Save Changes' : 'Create Post'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
