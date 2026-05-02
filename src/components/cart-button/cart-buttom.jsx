import React from 'react';
import s from './Btncard.module.scss'; // Импортируем как объект 's'
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import usePrice from '../../hooks/TotalPrice';
import { useSelector } from 'react-redux';

export default function Btncard() {
  const { totalPrice, items } = useSelector((state) => state.cart);
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
