import React from 'react';
import MyLoader from '../Contentloader/ContentLoader';
import styles from '../Pizzalist/Pizzalist.module.scss'
function Pizzaskeleton() {
  return (
    // Добавляем класс allpizzas, чтобы сработал ваш CSS с grid
    <div className={styles.allpizzas}> 
      {[...Array(10)].map((_, index) => ( // 12 штук обычно достаточно для заполнения экрана
        <MyLoader key={index} />
      ))}
    </div>
  );
}

export default Pizzaskeleton;
