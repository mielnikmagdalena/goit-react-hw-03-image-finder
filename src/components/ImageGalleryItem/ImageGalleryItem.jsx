import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css'; // Zaimportuj moduł CSS

class ImageGalleryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false, // Stan określający, czy modal jest widoczny
    };
  }

  // Metoda do obsługi kliknięcia w miniaturę obrazka
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  // Metoda do obsługi zamknięcia modala
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { image } = this.props; // Pobierz obiekt obrazka z props

    return (
      <li className={styles['gallery-item']}>
        {/* Miniatura obrazka z obsługą kliknięcia */}
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={styles['gallery-image']}
          onClick={this.handleOpenModal}
        />

        {/* Modal */}
        {this.state.showModal && (
          <div className={styles.overlay} onClick={this.handleCloseModal}>
            <div className={styles.modal}>
              {/* Duży obrazek w modalu */}
              <img src={image.largeImageURL} alt={image.tags} />
            </div>
          </div>
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
