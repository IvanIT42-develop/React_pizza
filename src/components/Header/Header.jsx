import React from 'react'
import pieceofpizza from "../../assets/img/pieceofpizza.png"
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <div>
        <Link to="/">
        <div className='imgwithdescription'>
            <img src={pieceofpizza} alt="кусочек пиццы" width={100} />
           <div>
             <h1>REACT PIZZA</h1>
            <p>самая вкусная пицца во вселенной</p>
           </div>
        </div>
        </Link>
      <div>
        <button></button>
      </div>
    </div>
  )
}
