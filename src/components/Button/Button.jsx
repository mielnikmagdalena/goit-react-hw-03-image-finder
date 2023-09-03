import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, label }) => (
  <button type="button" className={styles.loadMoreButton} onClick={onClick}>
    {label}
  </button>
);

export default Button;
