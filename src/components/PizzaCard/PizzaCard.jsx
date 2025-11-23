import React, { useState } from 'react';
import classes from './PizzaCard.module.scss';

function PizzaCard({ price, title, imageUrl, sizes, types, imageMap}) {

  const [pizzaCount, setPizzaCount] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);



  const typeNames = ['тонкое', 'традиционное'];

  return (
    <div className={classes.parent}>
      <img src={imageMap[imageUrl]} alt="" width={260} />
      <h3 className={classes.title}>{title}</h3>
      {/* Типы теста */}
     <div className={classes.typesandsizes}>
       <div className={classes.typesOfPizza}>
        {types.map((text, index) => (
          <li 
            key={index}
            onClick={() => setActiveType(index)}
            className={`${classes.typeItem} ${activeType === index ? classes.active : ""}`}
          >
            {typeNames[text]}
          </li>
        ))}
      </div>
      
      
      
      {/* Размеры */}
      <div className={classes.sizes}>
        {sizes.map((size, index) => (
          <li 
            key={index} 
            className={`${classes.sizeItem} ${activeSize === index ? classes.active : ""}`}
            onClick={() =>  setActiveSize(index)}
          >
            {size} см.
          </li>
        ))}
      </div>
     </div>
      
      <div className={classes.pricewithadd}>
        <p className={classes.price}>от {price} руб</p>
        <button onClick={() => setPizzaCount(pizzaCount + 1)} className={classes.pizzaCount}>
          <div className={classes.plus}>+</div> 
          <p className={classes.addBtn}>Добавить</p>
          {pizzaCount > 0 && <span className={classes.count}>{pizzaCount}</span>}
        </button>
      </div>
    </div>
  );
}

export default PizzaCard;