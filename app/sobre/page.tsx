export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Sobre a Puel</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            A Puel é uma marca de moda comprometida em oferecer peças de qualidade 
            com estilo único. Nossa missão é vestir pessoas e empresas com elegância 
            e conforto.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Nossa História</h2>
          <p className="text-gray-700 mb-6">
            Fundada com a paixão pela moda e o desejo de criar peças que combinem 
            qualidade, estilo e acessibilidade, a Puel tem se destacado no mercado 
            oferecendo soluções para diferentes necessidades.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Nossos Valores</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Qualidade em cada peça</li>
            <li>Atendimento personalizado</li>
            <li>Sustentabilidade e responsabilidade social</li>
            <li>Inovação constante em design e conforto</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Nossas Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Varejo</h3>
              <p className="text-gray-600">
                Peças cuidadosamente selecionadas para seu guarda-roupa pessoal.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Atacado</h3>
              <p className="text-gray-600">
                Soluções para lojistas e revendedores com condições especiais.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Uniformes</h3>
              <p className="text-gray-600">
                Uniformes personalizados para empresas de todos os portes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Sobre - Puel Fashion Brand',
  description: 'Conheça a história e os valores da Puel Fashion Brand.',
}
