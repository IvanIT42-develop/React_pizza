import React, { useState } from 'react';
import classes from './PizzaCard.module.scss';
import { useCart } from '../../hooks/useCart';

function PizzaCard({ price, title, imageUrl, sizes, types, imageMap, id }) {
  const [pizzaCount, setPizzaCount] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const { onAddToCard } = useCart();
  const typeNames = ['тонкое', 'традиционное'];

  // ПРОСТАЯ ЛОГИКА: используем imageUrl как ключ для получения изображения из imageMap
  const imageSrc = imageMap?.[imageUrl] || '';
  const handlePlusClick = () => {
    // 1. Увеличиваем счетчик
    setPizzaCount((prev) => prev + 1);

    // 2. Вызываем функцию из хука
    onAddToCard({
      id,
      title,
      price,
      imageUrl: imageSrc, // используем уже готовую переменную imageSrc
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
            <li
              key={`${id}-type-${index}`}
              onClick={() => setActiveType(index)}
              className={`${classes.typeItem} ${activeType === index ? classes.active : ''}`}>
              {typeNames[text]}
            </li>
          ))}
        </div>

        <div className={classes.sizes}>
          {sizes.map((size, index) => (
            <li
              key={`${id}-size-${index}`}
              className={`${classes.sizeItem} ${activeSize === index ? classes.active : ''}`}
              onClick={() => setActiveSize(index)}>
              {size} см.
            </li>
          ))}
        </div>
      </div>

      <div className={classes.pricewithadd}>
        <p className={classes.price}>от {price} руб</p>
        <div onClick={handlePlusClick} className={classes.pizzaCount}>
          <div className={classes.plus}>+</div>
          <p className={classes.addBtn}>Добавить</p>
          {pizzaCount >= 0 && <span className={classes.count}>{pizzaCount}</span>}
        </div>
      </div>
    </div>
  );
}

export default PizzaCard;
