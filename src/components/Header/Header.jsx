import React from 'react'
import pieceofpizza from "../../assets/img/pieceofpizza.png"
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <div>
        <Link to="/">
        <div className='imgwithdescription'>
            <img src={pieceofpizza} alt="кусочек пиццы" className='heades_pizzaimage' />
           <div>
             <h1 className='headers_h1'>REACT PIZZA</h1>
            <h3 className='headers_h3'>самая вкусная пицца во вселенной</h3>
           </div>
        </div>
        </Link>
      
    </div>
  )
}
