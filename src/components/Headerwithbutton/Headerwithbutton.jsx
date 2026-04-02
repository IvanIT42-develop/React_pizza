import React from 'react';
import Header from '../Header/Header';
import Btncard from '../cart-button/cart-buttom';
import styles from './Headerwithbutton.module.css';

function Headerwithbutton() {
  return (
    <div className={styles.headerwithbutton}>
      <Header />
      <Btncard />
    </div>
  );
}

export default Headerwithbutton;