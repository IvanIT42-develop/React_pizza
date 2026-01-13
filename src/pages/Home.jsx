import React, { useContext } from 'react'
import Sort from '../components/Sort/Sort'
import MyLoader from '../components/Contentloader/ContentLoader'
import PizzaCard from '../components/PizzaCard/PizzaCard'
import { useState } from 'react'
import { AppContext } from '../CreateContext'
import Categories from '../components/Categories/Categories'
import Header from '../components/Header/Header'
function Home() {

    const{pizzas,imageMap,isLoading} = useContext(AppContext)
  return (
    <div className='HomePage'>
     
        <div className='Categories'>
          <Categories />
        </div>
      <div className="content__top">
                
              </div>

              <div className="content__titleandsearchinput">
                <h2 className="content__title">Все пиццы</h2>
                <input type="text" class="search-input" placeholder="Поиск..."></input>
              </div>

              <div className='parentofpizzas'>
                <div className="allpizzas">
                  {isLoading ? (
                    <div className="skeleton">
                      {[...Array(8)].map((_, index) => (
                        <MyLoader key={index} />
                      ))}
                    </div>
                  ) : (
                    pizzas.map((obj, index) => (
                      <PizzaCard {...obj} imageMap={imageMap} key={obj.id} id={obj.id} />
                    ))
                  )}
                </div>
              </div>
                 
    </div>
  )
}

export default Home
