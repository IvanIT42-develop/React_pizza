import React, { useContext } from 'react'


import classes from "./CategorieswithSort.module.css"
import Categories from '../Categories/Categories'

import Sort from '../Sort/Sort'
function CategorieswithSort() {
  
  return (
  <div className={classes.CategorieswithSort}>
    <Categories></Categories>
    <Sort/>
  </div>
  )
}

export default CategorieswithSort
