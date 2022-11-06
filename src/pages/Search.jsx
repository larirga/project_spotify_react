import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      disabledSearch: true,
      inputValue: '',
      saveInput: '',
      arrayApi: [],
      notFound: false,

    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange({ target }) {
    const enabled = (target.value.length > 1);
    this.setState({
      disabledSearch: !enabled,
    });
    this.setState({
      inputValue: target.value,
    });
  }

  handleSearchClick = async (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    const fetchApi = await searchAlbumsAPI(inputValue);
    this.setState({
      saveInput: inputValue,
      inputValue: '',
      arrayApi: fetchApi,
      notFound: true,
    });
  };

  render() {
    const { disabledSearch, inputValue, saveInput, arrayApi, notFound } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="search"
            data-testid="search-artist-input"
            onChange={ this.handleSearchChange }
            value={ inputValue }
          />
        </form>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabledSearch }
          onClick={ this.handleSearchClick }
        >
          Pesquisar
        </button>
        <div>
          { (arrayApi.length === 0 && notFound === true)
          && <h1>`Nenhum álbum foi encontrado`</h1> }
        </div>
        <div>
          <h1>{`Resultado de álbuns de: ${saveInput}`}</h1>
          <div>
            { arrayApi.map(({ collectionId, collectionName }) => (
              <nav key={ collectionId }>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  {' '}
                  { collectionName }
                </Link>
              </nav>
            )) }
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
