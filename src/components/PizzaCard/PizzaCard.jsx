import React, { useState } from 'react'; 
import classes from './PizzaCard.module.scss'; 
import { useCart } from '../../hooks/useCart'; 

function PizzaCard({ prices, title, imageUrl, sizes, types, imageMap, id }) { 
  // 1. УДАЛИЛИ локальный стейт pizzaCount. Вместо него берем cartItems из хука
  const { onAddToCard, cartItems } = useCart(); 
  
  const [activeType, setActiveType] = useState(0); 
  const [activeSize, setActiveSize] = useState(0); 
  const typeNames = ['тонкое', 'традиционное']; 

  const imageSrc = imageMap?.[imageUrl] || ''; 
  
  // 2. ДИНАМИЧЕСКИЙ СЧЁТЧИК: считаем, сколько таких пицц именно этого размера сейчас лежит на сервере
  const pizzaCount = cartItems?.filter(
    (item) => item.title === title && item.size === sizes[activeSize]
  ).length || 0;

  const currentPrice = prices?.[sizes[activeSize]] || null; 

  const handlePlusClick = () => { 
    onAddToCard({ 
      id, 
      title, 
      imageUrl: imageSrc, 
      prices, 
      size: sizes[activeSize] ,
      title:title
    }); 
  }; 

  return ( 
    <div className={classes.parent} data-id={id}> 
      <div className={classes.parentofimg}> 
        <img src={imageSrc} alt={title} className={classes.pizzaimage} /> 
      </div> 
      <h3 className={classes.title}>{title}</h3> 
      <div className={classes.typesandsizes}> 
        <div className={classes.typesOfPizza}> 
          {types.map((text, index) => ( 
            <li key={`${id}-type-${index}`} onClick={() => setActiveType(index)} className={`${classes.typeItem} ${activeType === index ? classes.active : ''}`}> 
              {typeNames[text]} 
            </li> 
          ))} 
        </div> 
        <div className={classes.sizes}> 
          {sizes.map((size, index) => ( 
            <li key={`${id}-size-${index}`} className={`${classes.sizeItem} ${activeSize === index ? classes.active : ''}`} onClick={() => setActiveSize(index)}> 
              {size} см. 
            </li> 
          ))} 
        </div> 
      </div> 
      <div className={classes.pricewithadd}> 
        <p className={classes.price}>от {currentPrice} руб</p> 
        <div onClick={handlePlusClick} className={classes.pizzaCount}> 
          <div className={classes.plus}>+</div> 
          <p className={classes.addBtn}>Добавить</p> 
          {/* Счётчик теперь берётся из переменной pizzaCount и показывается, только если он больше нуля */}
          {pizzaCount > 0 && <span className={classes.count}>{pizzaCount}</span>} 
        </div> 
      </div> 
    </div> 
  ); 
} 

export default PizzaCard;
