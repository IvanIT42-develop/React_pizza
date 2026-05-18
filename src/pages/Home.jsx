import React, { useContext } from 'react';
import { AppContext } from '../CreateContext';

import Searchinputandcontent_title from '../components/Search-input/Search-input';
import Pizzaskeleton from '../components/Pizzaskeleton/Pizzaskeleton';
import PizzaList from '../components/Pizzalist/Pizzalist';
import CategorieswithSort from '../components/CategorieswithSort/CategorieswithSort';

function Home() {
  
  const { pizzas, imageMap, isLoading, searchValue,activeCategory, setActiveCategory } = useContext(AppContext);
 
  const filteredpizzas = pizzas.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
const finalPizzas = activeCategory > 0
    ? filteredpizzas.filter((item) => item.category === activeCategory)
    : filteredpizzas;
  return (
    <div className="HomePage">
      
      <CategorieswithSort/>
      <Searchinputandcontent_title />

      <div className="parentofpizzas">
        {isLoading ? (
          <Pizzaskeleton />
        ) : (
          <PizzaList items={finalPizzas} imageMap={imageMap} />
        )}
      </div>
      
    </div>
  );
}

export default Home;
