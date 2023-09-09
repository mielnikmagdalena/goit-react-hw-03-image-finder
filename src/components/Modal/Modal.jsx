import React from 'react';
import styles from './Modal.module.css'; // Zaimportuj moduł CSS

const Modal = ({ src, alt, onClose }) => (
  <div className={styles.Overlay} onClick={onClose}>
    <div className={styles.Modal}>
      <img src={src} alt={alt} />
    </div>
  </div>
);

export default Modal;
