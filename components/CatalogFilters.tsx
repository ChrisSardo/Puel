'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

interface CatalogFiltersProps {
  currentCategory?: string
  currentSearch?: string
}

export default function CatalogFilters({ currentCategory, currentSearch }: CatalogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(currentSearch || '')

  const categories = [
    { value: '', label: 'Todas' },
    { value: 'VAREJO', label: 'Varejo' },
    { value: 'ATACADO', label: 'Atacado' },
    { value: 'UNIFORME', label: 'Uniformes' },
  ]

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('categoria', category)
    } else {
      params.delete('categoria')
    }
    if (search) {
      params.set('busca', search)
    } else {
      params.delete('busca')
    }
    router.push(`/catalogo?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set('busca', search)
    } else {
      params.delete('busca')
    }
    if (currentCategory) {
      params.set('categoria', currentCategory)
    }
    router.push(`/catalogo?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch('')
    router.push('/catalogo')
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  const params = new URLSearchParams(searchParams.toString())
                  params.delete('busca')
                  router.push(`/catalogo?${params.toString()}`)
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
        </form>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentCategory === cat.value || (!currentCategory && !cat.value)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clear Filters */}
        {(currentCategory || currentSearch) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  )
}
