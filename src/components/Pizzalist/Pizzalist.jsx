import React from 'react';
import PizzaCard from '../PizzaCard/PizzaCard';
import styles from './PizzaList.module.scss'; // Импорт стилей

function PizzaList({ items, imageMap }) {
  if (items.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <h2>Ничего не найдено 😕</h2>
        <p>К сожалению, такой пиццы у нас нет.</p>
      </div>
    );
  }

  return (
    <div className={styles.allpizzas}>
      {items.map((obj) => (
        <PizzaCard 
          key={obj.id} 
          {...obj} 
          imageMap={imageMap} 
          id={obj.id} 
        />
      ))}
    </div>
  );
}

export default PizzaList;
