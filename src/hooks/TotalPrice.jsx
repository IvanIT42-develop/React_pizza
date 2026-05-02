import React from 'react'
import { AppContext } from '../CreateContext'
import { useContext } from 'react'
import { useCart } from './useCart'
export default function usePrice() {
    const{cartItems,setCartItems}=useCart()
    const totalPrice= cartItems.reduce((sum,obj)=>Number(obj.price)+sum,0)
  return  {cartItems,setCartItems,totalPrice}
   
  
}