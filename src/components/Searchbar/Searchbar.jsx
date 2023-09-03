import React, { Component } from 'react';
import styles from './Searchbar.module.css'; // Zaimportuj moduł CSS

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '', // Słowo klucz
    };
  }

  handleInputChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query); // Przekazujemy słowo klucz do rodzica
  };

  render() {
    const { query } = this.state;

    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleInputChange}
            className={styles.input}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
