import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar.jsx'; // Importuj komponent Searchbar
import ImageGallery from './ImageGallery/ImageGallery.jsx'; // Importuj komponent ImageGallery
import Button from './Button/Button.jsx'; // Importuj komponent Button
import Loader from './Loader/Loader.jsx'; // Importuj komponent Loader
import Modal from './Modal/Modal.jsx'; // Importuj komponent Modal

// Pozostałe importy...

export class App extends Component {
  // Tu dodaj swoje metody i stan komponentu App
  state = {
    images: [], // Tablica obrazków
    loading: false, // Flaga informująca o ładowaniu
    query: '', // Zapytanie użytkownika
    selectedImage: null, // Wybrany obrazek
  };
  handleImageClick = image => {
    this.setState({ selectedImage: image });
  };
  closeModal = () => {
    this.setState({ selectedImage: null });
  };
  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevProps.query !== query) {
      // Tutaj możesz dodać kod do obsługi zmiany zapytania (query).
      // Możesz na przykład wywołać funkcję handleSearch(query) na podstawie nowego zapytania.
      // 2. Następnie możesz przygotować URL zapytania do API Pixabay, w którym zawarte będzie zapytanie użytkownika (query).
      const apiKey = '38179044-0b179ee03efa6bc6d9a5998f4'; // Podstaw tu swój klucz API Pixabay
      const perPage = 12; // Liczba obrazków na stronę
      const page = 1; // Numer strony (pierwsza strona)
      const baseUrl = 'https://pixabay.com/api/';

      const url = `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

      // 3. Teraz możesz użyć np. funkcji fetch lub dowolnej biblioteki HTTP do wykonania zapytania do API Pixabay.
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // 4. Po otrzymaniu odpowiedzi z API możesz przetworzyć dane i zaktualizować stan komponentu.
          //    W tym przypadku, ustawiamy stan images na tablicę obrazków, które otrzymaliśmy z API.
          this.setState({ images: data.hits, loading: false });
        })
        .catch(error => {
          // 5. W przypadku błędu podczas zapytania, obsłuż go tutaj, np. możesz ustawić stan error i wyświetlić komunikat użytkownikowi.
          console.error('Wystąpił błąd:', error);
          this.setState({ loading: false });
        });
    }
  }
  handleSearch = query => {
    // Ta metoda obsługuje wyszukiwanie obrazków na podstawie podanego zapytania (query).
    // 1. Na początku możemy ustawić stan loading na true, aby pokazać użytkownikowi, że trwa ładowanie danych.
    this.setState({ loading: true, query });
  };
  render() {
    const { images, loading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        {loading ? <Loader /> : <ImageGallery images={images} />}
        {images.length > 0 && !loading && <Button />}
        {this.state.selectedImage && (
          <Modal image={this.state.selectedImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
