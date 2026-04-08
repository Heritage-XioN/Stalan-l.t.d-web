'use client'

import { useState, useEffect } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Trash2, Edit2, Plus } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  category: string
  status: string
  description: string
  price: string | null
  purchaseUrl: string | null
  published: boolean
}

const initialFormData = {
  name: '',
  slug: '',
  category: '',
  status: '',
  description: '',
  price: '',
  purchaseUrl: ''
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const response = await fetch('/api/admin/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('[Products] Error fetching:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleTogglePublished(id: string, published: boolean) {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published })
      })

      if (response.ok) {
        setProducts(products.map(p => p.id === id ? { ...p, published: !published } : p))
      }
    } catch (error) {
      console.error('[Products] Error updating:', error)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error('[Products] Error deleting:', error)
    }
  }

  function openCreateDialog() {
    setSelectedProduct(null)
    setFormData(initialFormData)
    setIsDialogOpen(true)
  }

  function openEditDialog(product: Product) {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      slug: product.slug,
      category: product.category,
      status: product.status,
      description: product.description,
      price: product.price ?? '',
      purchaseUrl: product.purchaseUrl ?? ''
    })
    setIsDialogOpen(true)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)

    const payload = {
      name: formData.name,
      slug: formData.slug,
      category: formData.category,
      status: formData.status,
      description: formData.description,
      price: formData.price.trim() || undefined,
      purchaseUrl: formData.purchaseUrl.trim() || undefined,
      ...(selectedProduct
        ? {}
        : {
            features: [],
            tags: []
          })
    }

    try {
      const response = await fetch(
        selectedProduct ? `/api/admin/products/${selectedProduct.id}` : '/api/admin/products',
        {
          method: selectedProduct ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to save product')
      }

      const savedProduct = await response.json()

      setProducts((currentProducts) => {
        if (selectedProduct) {
          return currentProducts.map((product) =>
            product.id === savedProduct.id ? savedProduct : product
          )
        }

        return [...currentProducts, savedProduct]
      })

      setIsDialogOpen(false)
      setSelectedProduct(null)
      setFormData(initialFormData)
    } catch (error) {
      console.error('[Products] Error saving:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#0A0A0A]">Products</h1>
            <Button
              onClick={openCreateDialog}
              className="rounded-none bg-black text-white hover:bg-[#C8F135] hover:text-black"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : products.length === 0 ? (
            <Card className="border border-black/20 bg-white">
              <CardContent className="py-8 text-center text-[#0A0A0A]">
                No products yet
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-black/20 bg-white">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5F5F5]">
                      <TableHead className="font-bold text-black">Name</TableHead>
                      <TableHead className="font-bold text-black">Category</TableHead>
                      <TableHead className="font-bold text-black">Status</TableHead>
                      <TableHead className="font-bold text-black">Published</TableHead>
                      <TableHead className="font-bold text-black">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium text-[#0A0A0A]">{product.name}</TableCell>
                        <TableCell className="text-[#0A0A0A]">{product.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={product.published}
                            onCheckedChange={() => handleTogglePublished(product.id, product.published)}
                          />
                        </TableCell>
                        <TableCell className="space-x-2 text-[#0A0A0A]">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="border border-black/20 bg-white text-[#0A0A0A]">
              <DialogHeader>
                <DialogTitle>{selectedProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                />
                <Input
                  placeholder="Slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                />
                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                />
                <Input
                  placeholder="Status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                />
                <Input
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                />
                <Input
                  placeholder="Price (USD/NGN)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                />
                <Input
                  placeholder="Paystack Purchase URL"
                  value={formData.purchaseUrl}
                  onChange={(e) => setFormData({ ...formData, purchaseUrl: e.target.value })}
                  className="bg-white text-[#0A0A0A] focus-visible:border-2 focus-visible:border-black focus-visible:ring-0"
                />
                <Button type="submit" disabled={isSaving} className="w-full rounded-none bg-black text-white hover:bg-[#C8F135] hover:text-black">
                  {isSaving ? 'Saving...' : 'Save Product'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
