import Navbar from './Components/navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/home/Home'
import Coin from './Pages/coin/Coin'
import Footer from './Components/footer/Footer'
import Predictions from './Pages/predictions/Predictions'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinId' element={<Coin/>}/>
        <Route path='/predictions' element={<Predictions/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
