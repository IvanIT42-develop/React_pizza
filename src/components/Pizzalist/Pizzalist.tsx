import React from 'react';
import PizzaCard from '../PizzaCard/PizzaCard';
import styles from './PizzaList.module.scss'; // Импорт стилей
import { Pizza } from '../../App';
import { images } from '../../App';
interface PizzaListProps{
  items:Pizza[];
  imageMap:images;
}
function PizzaList({ items, imageMap }:PizzaListProps) {


  if (items.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <h2>Ничего не найдено 😕</h2>
        <p>К сожалению, такой пиццы у нас нет.</p>
      </div>
    );
  }

 else{ return (
    <div className={styles.allpizzas}>
      {items.map((obj:Pizza) => (
        <PizzaCard 
          key={obj.id} 
          {...obj} 
          imageMap={imageMap} 
          id={obj.id} 
          
        />
      ))}
    </div>
  );}
}

export default PizzaList;
