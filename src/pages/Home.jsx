import React, { useContext } from 'react';
import { AppContext } from '../CreateContext';

import Searchinputandcontent_title from '../components/Search-input/Search-input';
import Pizzaskeleton from '../components/Pizzaskeleton/Pizzaskeleton';
import PizzaList from '../components/PizzaList/PizzaList'; // Импортируем новый компонент

function Home() {
  const { pizzas, imageMap, isLoading, searchValue } = useContext(AppContext);

  const filteredpizzas = pizzas.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="HomePage">
      <Searchinputandcontent_title />

      <div className="parentofpizzas">
        {isLoading ? (
          <Pizzaskeleton />
        ) : (
          <PizzaList items={filteredpizzas} imageMap={imageMap} />
        )}
      </div>
    </div>
  );
}

export default Home;
