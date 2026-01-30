'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import type { Database } from '@/lib/database.types'

type ProductUpdate = Database['public']['Tables']['products']['Update']
import type { ProductWithImages, ProductCategory } from '@/lib/supabase/types'
type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductImageInsert = Database['public']['Tables']['product_images']['Insert']
type ProductImageUpdate = Database['public']['Tables']['product_images']['Update']

import Image from 'next/image'
import { FiUpload, FiX, FiArrowLeft, FiArrowUp, FiArrowDown } from 'react-icons/fi'

interface ProductFormProps {
  product?: ProductWithImages
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    category: (product?.category || 'VAREJO') as ProductCategory,
    description: product?.description || '',
    price: product?.price?.toString() || '',
    show_price: product?.show_price ?? true,
    active: product?.active ?? true,
  })
  type UiImage = {
  id: string
  url: string
  position: number
  isNew?: boolean
}

const [images, setImages] = useState<UiImage[]>(product?.images || [])

  const [error, setError] = useState('')

  useEffect(() => {
    if (!product && formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(formData.name),
      }))
    }
  }, [formData.name, product])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `products/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      setImages((prev) => [
        ...prev,
        {
          id: `temp-${Date.now()}`,
          url: data.publicUrl,
          position: prev.length,
          isNew: true,
        },
      ])
    } catch (err: any) {
      setError('Erro ao fazer upload: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    const image = images[index]
    setImages((prev) => prev.filter((_, i) => i !== index))

    // Se não for uma imagem nova, marcar para deletar
    if (!image.isNew && product) {
      // A deleção será feita no backend
    }
  }

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images]
    const newIndex = direction === 'up' ? index - 1 : index + 1

    if (newIndex < 0 || newIndex >= newImages.length) return

    const temp = newImages[index]
    newImages[index] = newImages[newIndex]
    newImages[newIndex] = temp

    newImages.forEach((img, i) => {
      img.position = i
    })

    setImages(newImages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (product) {
        // Update
        const updateData: ProductUpdate = {
          name: formData.name,
          slug: formData.slug,
          category: formData.category,
          description: formData.description ? formData.description : null,
          price: formData.price ? parseFloat(formData.price) : null,
          show_price: formData.show_price,
          active: formData.active,
          updated_at: new Date().toISOString(),
        }

        const { error: updateError } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', product.id)

        if (updateError) throw updateError


        // Update images
        const existingImages = images.filter((img) => !img.isNew)
        const newImages = images.filter((img) => img.isNew)

        // Delete removed images
        const imagesToDelete = (product.images || []).filter(
          (oldImg) => !existingImages.find((img) => img.id === oldImg.id)
        )

        for (const img of imagesToDelete) {
          await supabase.from('product_images').delete().eq('id', img.id)
        }

        // Add new images
        for (const img of newImages) {
          const payload: ProductImageInsert = {
            product_id: product.id,
            url: img.url,
            position: img.position,
          }

          const { error } = await supabase.from('product_images').insert(payload)
          if (error) throw error
        }


        for (const img of existingImages) {
          const payload: ProductImageUpdate = { position: img.position }

          const { error } = await supabase
            .from('product_images')
            .update(payload)
            .eq('id', img.id)

          if (error) throw error
        }

      } else {
        // Create
        const insertData: ProductInsert = {
          name: formData.name,
          slug: formData.slug,
          category: formData.category,
          description: formData.description ? formData.description : null,
          price: formData.price ? parseFloat(formData.price) : null,
          show_price: formData.show_price,
          active: formData.active,
        }

        const { data: newProduct, error: createError } = await supabase
          .from('products')
          .insert(insertData)
          .select()
          .single()

        if (createError) throw createError
        if (!newProduct) throw new Error('Produto não retornou após criação.')

        for (const img of images) {
          const payload: ProductImageInsert = {
            product_id: newProduct.id,
            url: img.url,
            position: img.position,
          }
          const { error } = await supabase.from('product_images').insert(payload)
          if (error) throw error
        }

      }

      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError('Erro ao salvar produto: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Produto *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug (URL) *
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="VAREJO">Varejo</option>
            <option value="ATACADO">Atacado</option>
            <option value="UNIFORME">Uniformes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preço
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="show_price"
            checked={formData.show_price}
            onChange={handleInputChange}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Mostrar preço</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleInputChange}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Produto ativo</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagens *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {images.map((img, index) => (
            <div key={img.id || index} className="relative group">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={img.url}
                  alt={`Imagem ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'up')}
                    className="bg-white p-1 rounded shadow"
                  >
                    <FiArrowUp size={14} />
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'down')}
                    className="bg-white p-1 rounded shadow"
                  >
                    <FiArrowDown size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="bg-red-500 text-white p-1 rounded shadow"
                >
                  <FiX size={14} />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition-colors">
          <FiUpload size={20} />
          <span>{uploading ? 'Enviando...' : 'Adicionar Imagem'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading || images.length === 0}
          className="bg-primary-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : product ? 'Atualizar' : 'Criar Produto'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
