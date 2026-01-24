'use client'

import { FiMessageCircle } from 'react-icons/fi'
import { getWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils'
import { ProductCategory } from '@/lib/supabase/types'

interface WhatsAppButtonProps {
  productName: string
  category: ProductCategory
  phone?: string
  className?: string
}

export default function WhatsAppButton({
  productName,
  category,
  phone = '5511999999999', // Substitua pelo número real
  className = '',
}: WhatsAppButtonProps) {
  const message = getWhatsAppMessage(productName, category)
  const url = getWhatsAppUrl(phone, message)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors ${className}`}
    >
      <FiMessageCircle size={20} />
      Chamar no WhatsApp
    </a>
  )
}
