import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      artistName: '',
      albumName: '',
      listMusic: [],
      checkbox: {},
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const fetchListMusic = await getMusics(match.params.id);
    // console.log(fetchListMusic);
    const arrayFirstElement = fetchListMusic.filter((music) => music.trackName);
    this.setState({
      artistName: fetchListMusic[0].artistName,
      albumName: fetchListMusic[0].collectionName,
      listMusic: arrayFirstElement,
    });
    this.handleLoading();
    this.setState({
      loading: false,
    });
  }

  handleLoading = async () => {
    const favoriteMusic = await getFavoriteSongs();
    if (favoriteMusic.length > 0) {
      favoriteMusic.forEach((music) => this.setState((prev) => ({
        checkbox: { ...prev.checkbox, [music.trackName]: true } })));
    }
  };

  handleChange = ({ target }) => {
    this.setState({
      loading: true,
    });
    const { name, checked } = target;
    this.setState((prev) => ({
      checkbox: { ...prev.checkbox, [name]: checked },
    }), () => this.handleAddSong(checked, name));
  };

  handleAddSong = async (checked, name) => {
    const { listMusic } = this.state;
    const findMusic = listMusic.find(({ trackName }) => trackName === name);
    if (!checked) {
      await removeSong(findMusic);
      this.setState({
        loading: false,
      });
    } else {
      await addSong(findMusic);
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { artistName, albumName, listMusic, checkbox, loading } = this.state;
    // console.log(loading);
    return (
      <div data-testid="page-album">
        <Header />
        <h2>Album</h2>
        <h3 data-testid="artist-name">{ artistName }</h3>
        <p data-testid="album-name">{ albumName }</p>
        { loading && <Loading /> }
        {loading || listMusic.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            music={ music }
            checkbox={ checkbox[music.trackName] }
            handleChange={ this.handleChange }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

};

export default Album;
