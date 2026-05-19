import React, { useContext } from 'react'; 
import { AppContext } from '../CreateContext'; 
import Searchinputandcontent_title from '../components/Search-input/Search-input'; 
import Pizzaskeleton from '../components/Pizzaskeleton/Pizzaskeleton'; 
import PizzaList from '../components/Pizzalist/Pizzalist'; 
import CategorieswithSort from '../components/CategorieswithSort/CategorieswithSort'; 
import { HomeContext } from '../CreateContext';
function Home() { 
  const { pizzas, imageMap, isLoading, searchValue, activeCategory, setActiveCategory, sortType, setSortType } = useContext(AppContext); 

  const priceSort = () => { 
   
    setSortType("price"); 
  }; 

  const resetSort = () => { 
    setSortType(pizzas); 
  }; 

  const alphabet = () => { 
    
    setSortType("title"); 
  }; 

  const filteredpizzas = pizzas.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()), ); 
  const finalPizzas = activeCategory > 0 ? filteredpizzas.filter((item) => item.category === activeCategory) : filteredpizzas; 
  
  const sortedPizzas = [...finalPizzas].sort((a, b) => { 
    if (sortType === 'price') return a.price - b.price;
    if (sortType === 'title') return a.title.localeCompare(b.title);
    if (sortType === 'rating') return b.rating - a.rating;
    return 0;
  }); 

  return ( 
   <HomeContext.Provider value={{
    priceSort:priceSort,
    alphabet:alphabet,
   }} >
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
