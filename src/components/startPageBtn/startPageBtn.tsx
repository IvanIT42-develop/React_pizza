import React from 'react'
import styles from "./startPageBtn.module.css"
import { Link } from 'react-router-dom';
function StartPageBtn() {
  return (
    <Link to='/'>
        <button className={styles.startPageBtn}>
        Вернуться назад
    </button>
    </Link>
  )
}

export default StartPageBtn
