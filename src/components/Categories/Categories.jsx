import React, { useState } from 'react';
import styles from "./Categories.module.scss"
import { AppContext } from '../../CreateContext';
import { useContext } from 'react';
function Categories() {
  
 const{activeCategory, setActiveCategory}=useContext(AppContext)
  const setCategory = (index) => {
    setActiveCategory(index);
  };
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((categoryName, index) => (
          <li onClick={()=>{setCategory(index)}} key={index} className={activeCategory === index ? styles.active:''}>{categoryName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
