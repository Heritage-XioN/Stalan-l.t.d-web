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
  price: number | null
  specifications: Record<string, string> | null
  published: boolean
  createdAt: string
  updatedAt: string
}

const initialFormData = {
  title: '',
  content: '',
  imageUrl: '',
  price: '',
  specifications: [{ key: '', value: '' }]
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
      imageUrl: post.imageUrl ?? '',
      price: post.price ?? '',
      specifications:
        post.specifications && Object.keys(post.specifications).length > 0
          ? Object.entries(post.specifications).map(([key, value]) => ({ key, value }))
          : [{ key: '', value: '' }]
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
      imageUrl: formData.imageUrl,
      price: formData.price.trim() || undefined,
      specifications: formData.specifications.reduce<Record<string, string>>((acc, spec) => {
        const key = spec.key.trim()
        const value = spec.value.trim()
        if (key && value) {
          acc[key] = value
        }
        return acc
      }, {})
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
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0A0A0A]">S.A.T Bots</h1>
              <p className="mt-2 text-sm text-[#0A0A0A]/70">Manage trading bot updates, images, and text posts.</p>
            </div>
            <Button
              onClick={openCreateDialog}
              className="rounded-none bg-black text-white hover:bg-[#C8F135] hover:text-black"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Post
            </Button>
          </div>

          {isLoading ? (
            <div className="py-8 text-center">Loading...</div>
          ) : posts.length === 0 ? (
            <Card className="border border-black/20 bg-white">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center text-[#0A0A0A]/70">
                <Bot className="mb-4 h-10 w-10 text-[#0A0A0A]/45" />
                <p className="text-base font-medium text-[#0A0A0A]">No S.A.T Bot posts yet</p>
                <p className="mt-2 text-sm text-[#0A0A0A]/70">Create the first update to start publishing trading bot content.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-black/20 bg-white">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5F5F5]">
                      <TableHead className="font-bold text-black">Title</TableHead>
                      <TableHead className="font-bold text-black">Content</TableHead>
                      <TableHead className="font-bold text-black">Image</TableHead>
                      <TableHead className="font-bold text-black">Status</TableHead>
                      <TableHead className="font-bold text-black">Created</TableHead>
                      <TableHead className="font-bold text-black">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium text-[#0A0A0A]">{post.title}</TableCell>
                        <TableCell className="max-w-md text-sm text-[#0A0A0A]">
                          {getContentPreview(post.content)}
                        </TableCell>
                        <TableCell>
                          {post.imageUrl ? (
                            <a
                              href={post.imageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-[#0A0A0A] hover:text-[#0A0A0A] hover:underline"
                            >
                              View image
                            </a>
                          ) : (
                            <span className="text-sm text-[#0A0A0A]/60">No image</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={post.published ? 'default' : 'outline'}>
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-[#0A0A0A]">
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
            <DialogContent className="border border-black/20 bg-white text-[#0A0A0A] sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-['Syne'] text-2xl font-black tracking-tight">
                  {selectedPost ? 'Edit S.A.T Bot Post' : 'Add S.A.T Bot Post'}
                </DialogTitle>
              </DialogHeader>
              <div className="max-h-[80vh] overflow-y-auto pr-6">
                <form onSubmit={handleSubmit} className="space-y-5 pb-2">
                <Input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({ ...formData, title: event.target.value })
                  }
                  required
                  className="bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                />
                <Textarea
                  placeholder="Content"
                  value={formData.content}
                  onChange={(event) =>
                    setFormData({ ...formData, content: event.target.value })
                  }
                  required
                  className="min-h-32 bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                />
                <Input
                  placeholder="Price (USD)"
                  value={formData.price}
                  onChange={(event) =>
                    setFormData({ ...formData, price: event.target.value })
                  }
                  className="bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#0A0A0A]">Specifications</p>
                    <Button
                      type="button"
                      onClick={() =>
                        setFormData((current) => ({
                          ...current,
                          specifications: [...current.specifications, { key: '', value: '' }]
                        }))
                      }
                      className="rounded-none border-2 border-black bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#F5F5F5]"
                    >
                      Add Spec
                    </Button>
                  </div>
                  {formData.specifications.map((spec, index) => (
                    <div key={`spec-${index}`} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
                      <Input
                        placeholder="Key (e.g. Accuracy)"
                        value={spec.key}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            specifications: current.specifications.map((item, idx) =>
                              idx === index ? { ...item, key: event.target.value } : item
                            )
                          }))
                        }
                        className="rounded-none border-2 border-black bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                      />
                      <Input
                        placeholder="Value (e.g. 94%)"
                        value={spec.value}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            specifications: current.specifications.map((item, idx) =>
                              idx === index ? { ...item, value: event.target.value } : item
                            )
                          }))
                        }
                        className="rounded-none border-2 border-black bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          setFormData((current) => {
                            if (current.specifications.length === 1) {
                              return {
                                ...current,
                                specifications: [{ key: '', value: '' }]
                              }
                            }
                            return {
                              ...current,
                              specifications: current.specifications.filter((_, idx) => idx !== index)
                            }
                          })
                        }
                        className="rounded-none border-2 border-black bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-[#F5F5F5]"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
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
                  className="h-12 w-full rounded-none bg-black font-semibold text-white hover:bg-[#C8F135] hover:text-black"
                >
                  {isSaving ? 'Saving...' : isUploadingImage ? 'Uploading image...' : selectedPost ? 'Save Changes' : 'Create Post'}
                </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
