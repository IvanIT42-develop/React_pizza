import React from 'react';
import s from './Btncard.module.scss'; // Импортируем как объект 's'
import { Link } from 'react-router-dom';
export default function Btncard() {
  return (
    <Link to="/cart">
      <button className={s.cartButton}>
        <span style={{}}>520 ₽</span>
        <div className={s.separator}></div>
        <div className={s.cartIcon}>
          <div> 🛒</div>
          <span className={s.count}>3</span>
        </div>
      </button>
    </Link>
  );
}
