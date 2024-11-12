import './App.css'
import Header from './components/Header'
import bannerImg from '/banner.jpg'
import jackpotImg from '/jacktop.png'


function App() {
  return (
    <div>
      <Header />
      <div className='mt-4'>
        <div className='px-2'>
          <img src={bannerImg} alt="" className='rounded-xl'/>
        </div>
        <div className='mt-5'>
          {/* <img src={jackpotImg} alt="" /> */}
        </div>
      </div>
    </div>
  )
}

export default App
