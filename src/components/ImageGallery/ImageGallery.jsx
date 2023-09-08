import React, { Component } from 'react';
import ImageGalleryItem from './../ImageGalleryItem/ImageGalleryItem.jsx';
class ImageGallery extends Component {
  state = {
    currentPage: 1, // Aktualna strona
    imagesPerPage: 12, // Ilość obrazków na stronę
  };

  // Funkcja do zmiany strony
  changePage = newPage => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { images } = this.props;
    const { currentPage, imagesPerPage } = this.state;

    // Oblicz indeksy początku i końca dla bieżącej strony
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;

    // Filtrowanie obrazków na podstawie indeksów
    const imagesOnCurrentPage = images.slice(
      indexOfFirstImage,
      indexOfLastImage
    );

    return (
      <div>
        <ul className="gallery">
          {imagesOnCurrentPage.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ul>
        <div className="pagination">
          {/* Przycisk "Poprzednia strona" */}
          {currentPage > 1 && (
            <button onClick={() => this.changePage(currentPage - 1)}>
              Previous Page
            </button>
          )}

          {/* Przycisk "Następna strona" */}
          {indexOfLastImage < images.length && (
            <button onClick={() => this.changePage(currentPage + 1)}>
              Next Page
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default ImageGallery;
