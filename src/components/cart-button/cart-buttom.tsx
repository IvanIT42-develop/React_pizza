import React from 'react';
import s from './Btncard.module.scss'; // Импортируем как объект 's'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
export default function Btncard() {
  const { totalPrice, items } = useSelector((state:RootState) => state.cart);
  return (
    <Link to="/cart">
      <button className={s.cartButton}>
        <span style={{}}>{totalPrice} ₽</span>
        <div className={s.separator}></div>
        <div className={s.cartIcon}>
          <div> 🛒</div>
          <span className={s.count}>{items.length}</span>
        </div>
      </button>
    </Link>
  );
}
