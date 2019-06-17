import React from 'react';
import styles from './Input.module.scss';

const Input = props => (
  <div className={styles.search}>
    <label htmlFor="searchInput">
      <img src="/media/images/search.png" alt="" />
    </label>
    <input id="searchInput" className={styles.inputStyles} {...props} />
  </div>
);

export default Input;
