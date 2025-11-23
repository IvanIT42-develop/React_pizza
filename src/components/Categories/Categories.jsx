import React, { useState } from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const setCategory = (index) => {
    setActiveCategory(index);
  };
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li onClick={()=>{setCategory(index)}} key={index} className={activeCategory===index? 'active':''}>{categoryName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
