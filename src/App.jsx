import './App.css'
import Header from './components/Header'
import bannerImg from '/banner.jpg'

function App() {
  return (
    <div>
      <Header />
      <div className='mt-4'>
        <div className='px-2'>
          <img src={bannerImg} alt="" className='rounded-xl'/>
        </div>
        <div className='mt-2 px-2'>
          <div className='scrolling-text bg-background-600 text-sm p-2 text-white rounded-lg'>
            <span>
              As recompensas VIP da semana serão distribuídas às 21h, na segunda-feira, dia 11 de novembro. 
              Não perca a oportunidade de garantir sua recompensa e vencer com as recompensas VIP.
            </span>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default App
