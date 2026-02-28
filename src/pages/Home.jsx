import React, { useContext } from 'react';
import Sort from '../components/Sort/Sort';
import MyLoader from '../components/Contentloader/ContentLoader';
import PizzaCard from '../components/PizzaCard/PizzaCard';
import { useState } from 'react';
import { AppContext } from '../CreateContext';
import Categories from '../components/Categories/Categories';
import Header from '../components/Header/Header';
import btnremove from '../assets/img/btn-remove.png';
function Home() {
  const [searchValue, setSearchValue] = useState('');
  const { pizzas, imageMap, isLoading } = useContext(AppContext);
  const filteredpizzas = pizzas.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="HomePage">
      <Categories />

      <div className="content__top"></div>

      <div className="content__titleandsearchinput">
        <h2 className={searchValue ? 'h2_with_searchValue' : 'h2_large'}>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все пиццы'}
        </h2>

        <div className='input_with_deletimg'>
          <input
            type="text"
            className="search-input"
            placeholder="Поиск..."
            value={searchValue}
            onChange={onChangeSearchInput}></input>
              <img
          src={btnremove}
          alt=""
          onClick={() => setSearchValue('')}
          className='deleteimg'
        />
        </div>
      
      </div>

      <div className="parentofpizzas">
        <div className="allpizzas">
          {isLoading ? (
            <div className="skeleton">
              {[...Array(8)].map((_, index) => (
                <MyLoader key={index} />
              ))}
            </div>
          ) : (
            filteredpizzas.map((obj, index) => (
              <PizzaCard {...obj} imageMap={imageMap} key={obj.id} id={obj.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
