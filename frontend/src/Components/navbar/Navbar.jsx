import { useContext } from 'react'
import './navbar.css'
import { CoinContext } from '../../Context/coinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext)

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": setCurrency({ name: "usd", Symbol: "$" }); break
      case "eur": setCurrency({ name: "eur", Symbol: "€" }); break
      case "inr": setCurrency({ name: "inr", Symbol: "₹" }); break
      default: setCurrency({ name: "usd", Symbol: "$" }); break
    }
  }

  return (
    <nav className='navbar'>
      <Link to='/' className="logo-container">
        <span className="site-title">CryptoTrack</span>
      </Link>

      <ul>
        <Link to={'/predictions'}><li>Predict Bitcoin Price</li></Link>
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
      </div>
    </nav>
  )
}

export default Navbar
