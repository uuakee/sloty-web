import './App.css'
import Header from './components/Header'
import bannerImg from '/banner.jpg'
import coletaCard from '/default_coleta.png'
import afiliadoCard from '/default_afiliado.png'
import roletaCard from '/default_roleta.png'
import surpresaCard from '/default_surpresa.png'
import Nav from './components/Nav'

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <div className=''>
        <div className="hdr-navigation-scrollable-bc mt-4 px-2">
          <nav className="hdr-navigation-scrollable-content">
            <a className="hdr-navigation-link-bc" target="_self" href="/pb/promotions">
              <span className="nav-menu-title">Promoções</span>
            </a>
            <a className="hdr-navigation-link-bc" target="_self" href="/pb/casino/tournaments">
              <span className="nav-menu-title">Torneios</span>
            </a>
            <a className="hdr-navigation-link-bc" target="_self" href="/pb/casino/slots">
              <span className="nav-menu-title">Cassino</span>
            </a>
            <a className="hdr-navigation-link-bc" target="_self" href="/pb/sports/pre-match/event-view">
              <span className="nav-menu-title">Pragmatic</span>
            </a>
            <a className="hdr-navigation-link-bc" target="_self" href="/pb/sports/live/event-view">
              <span className="nav-menu-title">PG Soft</span>
            </a>
            <a className="hdr-navigation-link-bc" target="_self" href="/?action=openLiveChat">
              <span className="nav-menu-title">Suporte</span>
            </a>
            <a className="hdr-navigation-link-bc" target="_self" href="/pb/help/faqs">
              <span className="nav-menu-title">FAQs</span>
            </a>
          </nav>
        </div>
      </div>
      <div className="mt-4">
        <div className="px-2">
          <img src={bannerImg} alt="" className="rounded-xl" />
        </div>
        <div className="mt-2 px-2">
          <div className="scrolling-text bg-background-600 text-sm p-2 text-white rounded-lg">
            <span>
              As recompensas VIP da semana serão distribuídas às 21h, na segunda-feira, dia 11 de novembro.
              Não perca a oportunidade de garantir sua recompensa e vencer com as recompensas VIP.
            </span>
          </div>
        </div>
        <div className="mt-2 px-2 grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <img src={coletaCard} alt="Coleta" width={50} height={50} className="mb-2" />
            <p className="text-xs text-white">Coleta</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={afiliadoCard} alt="Afiliado" width={50} height={50} className="mb-2" />
            <p className="text-xs text-white">Afiliado</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={roletaCard} alt="Roleta" width={50} height={50} className="mb-2" />
            <p className="text-xs text-white">Roleta</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={surpresaCard} alt="Surpresa" width={50} height={50} className="mb-2" />
            <p className="text-xs text-white">Surpresa</p>
          </div>
        </div>
        <div className="mt-4">
          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="relative z-10 bg-background-500 px-6 text-white text-sm">Jogos em tendência</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
