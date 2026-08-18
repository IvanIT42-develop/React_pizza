import React from 'react';
import classes from './NotFoundBlock.module.scss';
export default function NotFoundBlock() {
  console.log(classes);
  return (
    <div className={classes.root}>
      <h1>
        <span> 😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={classes.description}>
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
}
