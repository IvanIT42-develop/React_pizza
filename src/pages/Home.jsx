import React, { useContext } from 'react'
import Sort from '../components/Sort/Sort'
import MyLoader from '../components/Contentloader/ContentLoader'
import PizzaCard from '../components/PizzaCard/PizzaCard'
import { useState } from 'react'
import { AppContext } from '../CreateContext'
function Home() {

    const{pizzas,imageMap,isLoading} = useContext(AppContext)
  return (
    <div>
      <div className="content__top">
                <Sort></Sort>
              </div>

              <h2 className="content__title">Все пиццы</h2>

              <div>
                <div className="allpizzas">
                  {isLoading ? (
                    <div className="skeleton">
                      {[...Array(6)].map((_, index) => (
                        <MyLoader key={index} />
                      ))}
                    </div>
                  ) : (
                    pizzas.map((obj, index) => (
                      <PizzaCard {...obj} imageMap={imageMap} key={index} />
                    ))
                  )}
                </div>
              </div>
    </div>
  )
}

export default Home
