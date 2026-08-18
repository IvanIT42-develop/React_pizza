import React, { useContext } from 'react';
import { AppContext } from '../CreateContext';
import CategorieswithSort from '../components/CategorieswithSort/CategorieswithSort';
import { HomeContext } from '../CreateContext';
import { Pizza } from '../App';
import Searchinputandcontent_title from '../components/Search-input/Search-input';
import Pizzaskeleton from '../components/Pizzaskeleton/Pizzaskeleton';
import PizzaList from '../components/Pizzalist/Pizzalist';

function Home() {
  const {
    pizzas,
    imageMap,
    isLoading,
    searchValue,
    activeCategory,
    setActiveCategory,
    sortType,
    setSortType,
  } = useContext(AppContext);

  const priceSort = () => {
    setSortType('price');
  };
  const ratingSort = () => {
    setSortType('rating');
  };

  const alphabet = () => {
    setSortType('title');
  };
  const resetSort = () => {
    setSortType('default');
  };
  const filteredpizzas = pizzas.filter((item: Pizza) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const finalPizzas =
    activeCategory > 0
      ? filteredpizzas.filter((item: Pizza) => item.category === activeCategory)
      : filteredpizzas;

  const sortedPizzas = [...finalPizzas].sort((a, b) => {
  if (sortType === 'price') {
    // Достаем первые цены из объектов prices
    const priceA = Object.values(a.prices)[0] || 0;
    const priceB = Object.values(b.prices)[0] || 0;
    return priceA - priceB;
  }
  
  if (sortType === 'title') {
    return a.title.localeCompare(b.title);
  }
  
  if (sortType === 'rating') {
    // Защищаем код от undefined
    const ratingA = a.rating ?? 0;
    const ratingB = b.rating ?? 0;
    return ratingB - ratingA;
  }
  
  return 0;
});


  return (
    <HomeContext.Provider
      value={{
        priceSort: priceSort,
        alphabet: alphabet,
        ratingSort: ratingSort,
      }}>
      <div className="HomePage">
        <CategorieswithSort />
        <Searchinputandcontent_title />
        <div className="parentofpizzas">
          {isLoading ? <Pizzaskeleton /> : <PizzaList items={sortedPizzas} imageMap={imageMap} />}
        </div>
      </div>
    </HomeContext.Provider>
  );
}

export default Home;
