import React from 'react';
import styles from './ImageGalleryItem.module.css'; // Zaimportuj moduł CSS

const ImageGalleryItem = ({ image }) => (
  <li className={styles.galleryItem}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      className={styles.galleryItemImage}
    />
  </li>
);

export default ImageGalleryItem;
