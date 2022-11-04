import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      disabledSearch: true,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange({ target }) {
    const enabled = (target.value.length > 1);
    this.setState({
      disabledSearch: !enabled,
    });
  }

  render() {
    const { disabledSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="search"
            data-testid="search-artist-input"
            onChange={ this.handleSearchChange }
          />
        </form>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabledSearch }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
