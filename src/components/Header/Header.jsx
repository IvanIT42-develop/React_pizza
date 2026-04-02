import React from 'react';
import pieceofpizza from '../../assets/img/pieceofpizza.png';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Импортируем как styles

export default function Header() {
  return (
    <div>
      <Link to="/">
        <div className={styles.imgwithdescription}> {/* Используем styles. */}
          <img 
            src={pieceofpizza} 
            alt="кусочек пиццы" 
            className={styles.heades_pizzaimage} 
          />
          <div>
            <h1 className={styles.headers_h1}>REACT PIZZA</h1>
            <h3 className={styles.headers_h3}>самая вкусная пицца во вселенной</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}