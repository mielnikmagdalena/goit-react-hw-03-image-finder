import React from 'react';
import styles from './ImageGalleryItem.module.css'; // Zaimportuj moduł CSS

const ImageGalleryItem = ({ image, onImageClick }) => (
  <li className={styles.GalleryItem}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      className={styles.GalleryItemImage}
      onClick={() => onImageClick(image)}
    />
  </li>
);

export default ImageGalleryItem;
