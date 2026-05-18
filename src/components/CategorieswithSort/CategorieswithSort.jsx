import React, { useContext } from 'react'
import Categories from '../Categories/Categories'
import Sort from '../Sort/Sort'
import classes from "./CategorieswithSort.module.css"
import { AppContext } from '../../CreateContext'
function CategorieswithSort() {
  
  return (
  <div className={classes.CategorieswithSort}>
    <Categories/ >
    <Sort/>
  </div>
  )
}

export default CategorieswithSort
