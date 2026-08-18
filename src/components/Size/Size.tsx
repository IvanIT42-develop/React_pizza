import React from 'react';
import classes from './Size.module.scss';
function Size() {
  return (
    <div className={classes.testo}>
      <div className={classes.kindoftesto}>
        <p className={classes.thintesto}>тонкое</p>
        <p className={classes.thicktesto}>традиционное</p>
      </div>
      <div className={classes.size}>
        <p>26 см.</p>
        <p className={classes.marginsofsize}>30 см.</p>
        <p>40 см.</p>
      </div>
    </div>
  );
}

export default Size;
