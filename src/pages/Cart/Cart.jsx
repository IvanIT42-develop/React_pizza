import React from 'react';
import { useCart } from '../../hooks/useCart';
import styles from './Cart.module.css'; // Импортируем стили как объект

function Cart() {
  const { cartItems } = useCart();

  return (
    <div className={styles.cartWrapper}>
      <h2 className={styles.title}>Корзина</h2>
      
      {cartItems.length > 0 ? (
        <div className={styles.itemsList}>
          {cartItems.map((obj) => (
            <div key={obj.id} className={styles.cartItem}>
              <img 
                className={styles.itemImg} 
                width={70} 
                src={obj.imageUrl} 
                alt={obj.title} 
              />
              <div className={styles.itemInfo}>
                <p>{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>Корзина пуста 😕</p>
      )}
    </div>
  );
}

export default Cart;
