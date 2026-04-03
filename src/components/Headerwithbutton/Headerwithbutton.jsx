import React from 'react';
import { useLocation } from 'react-router-dom'; // Импортируем хук для отслеживания пути
import Header from '../Header/Header';
import Btncard from '../cart-button/cart-buttom';
import styles from './Headerwithbutton.module.css';

function Headerwithbutton() {
  const location = useLocation(); // Получаем объект с текущим адресом

  return (
    <div className={`${location.pathname === '/' ? styles.headerwithbutton : styles.headerwithoutbutton}` }>
      <Header />
      {/* Проверка: если мы на главной ('/'), показываем кнопку */}
      {location.pathname === '/' && <Btncard />}
    </div>
  );
}

export default Headerwithbutton;
