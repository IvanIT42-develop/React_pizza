import React from 'react'
import AppContext from '../context'
import { useContext } from 'react'
export default function usePrice() {
    const{cartItems,setCartItems}=useContext(AppContext)
    const totalPrice= cartItems.reduce((sum,obj)=>Number(obj.price)+sum,0)
  return  {cartItems,setCartItems,totalPrice}
   
  
}