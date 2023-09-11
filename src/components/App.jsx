import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar.jsx'; // Importuj komponent Searchbar
import ImageGallery from './ImageGallery/ImageGallery.jsx'; // Importuj komponent ImageGallery
import Button from './Button/Button.jsx';
import Loader from './Loader/Loader.jsx'; // Importuj komponent Loader
import Modal from './Modal/Modal.jsx'; // Importuj komponent Modal

// Pozostałe importy...

export class App extends Component {
  state = {
    images: [], // Tablica obrazków
    loading: false, // Flaga informująca o ładowaniu
    query: '', // Zapytanie użytkownika
    selectedImage: null, // Wybrany obrazek
    page: 1, // Numer strony
  };
  handleImageClick = image => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      this.fetchImages
    );
  };

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ loading: true });

    const apiKey = '38179044-0b179ee03efa6bc6d9a5998f4'; // Podstaw tu swój klucz API Pixabay
    const perPage = 12; // Liczba obrazków na stronę
    const baseUrl = 'https://pixabay.com/api/';

    const url = `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const newImages = data.hits;
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          loading: false,
        }));
      })
      .catch(error => {
        console.error('Wystąpił błąd:', error);
        this.setState({ loading: false });
      });
  };

  handleSearch = query => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };

  render() {
    const { images, loading, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch} />
        {loading ? (
          <Loader />
        ) : (
          <ImageGallery
            images={images}
            onImageClick={this.handleImageClick}
            onLoadMore={this.handleLoadMore}
          />
        )}
        {selectedImage && (
          <Modal
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
            onClose={this.closeModal}
          />
        )}
        {images.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
