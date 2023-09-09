import React, { Component } from 'react';
import ImageGalleryItem from './../ImageGalleryItem/ImageGalleryItem.jsx';
import styles from './ImageGallery.module.css'; // Importuj moduł CSS

class ImageGallery extends Component {
  render() {
    return (
      <div>
        <ul className={styles.gallery}>
          {this.props.images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ul>
      </div>
    );
  }
}

export default ImageGallery;
