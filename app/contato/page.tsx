import WhatsAppButton from '@/components/WhatsAppButton'
import { FiInstagram, FiPhone, FiMapPin, FiClock } from 'react-icons/fi'

export default function ContatoPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Entre em Contato</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* WhatsApp */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FiPhone className="text-green-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold">WhatsApp</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Fale conosco diretamente pelo WhatsApp para tirar dúvidas, 
              fazer pedidos ou solicitar informações.
            </p>
            <WhatsAppButton
              productName="informações"
              category="VAREJO"
              className="w-full justify-center"
            />
          </div>

          {/* Instagram */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-pink-100 p-3 rounded-full mr-4">
                <FiInstagram className="text-pink-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold">Instagram</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Siga-nos no Instagram para ver novidades, lançamentos e 
              inspirações de moda.
            </p>
            <a
              href="https://instagram.com/puel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors w-full justify-center"
            >
              <FiInstagram size={20} />
              Seguir no Instagram
            </a>
          </div>
        </div>

        {/* Address (opcional) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FiMapPin className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">Endereço</h2>
          </div>
          <p className="text-gray-600">
            {/* Adicione o endereço real aqui quando disponível */}
            Entre em contato para mais informações sobre localização e horários de atendimento.
          </p>
        </div>

        {/* Horário */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FiClock className="text-purple-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">Horário de Atendimento</h2>
          </div>
          <div className="text-gray-600">
            <p className="mb-2"><strong>Segunda a Sexta:</strong> 9h às 18h</p>
            <p className="mb-2"><strong>Sábado:</strong> 9h às 13h</p>
            <p><strong>Domingo:</strong> Fechado</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Contato - Puel Fashion Brand',
  description: 'Entre em contato com a Puel Fashion Brand via WhatsApp, Instagram ou visite-nos.',
}
