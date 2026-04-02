import React from 'react';
import MyLoader from '../Contentloader/ContentLoader';

function Pizzaskeleton() {
  return (
    // Добавляем класс allpizzas, чтобы сработал ваш CSS с grid
    <div className="allpizzas "> 
      {[...Array(10)].map((_, index) => ( // 12 штук обычно достаточно для заполнения экрана
        <MyLoader key={index} />
      ))}
    </div>
  );
}

export default Pizzaskeleton;
