import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      check: false,
      loading: false,
      arrayFavoriteMusic: [],
    };

    this.handleFavorites = this.handleFavorites.bind(this);
  }

  async componentDidMount() {
    const favoritesMusics = await getFavoriteSongs();
    this.setState({
      arrayFavoriteMusic: favoritesMusics,
    });
  }

  async handleFavorites(event, music) {
    this.setState({
      loading: true,
    }, () => {});
    if (!event.target.checked) {
      await removeSong(music);
      this.setState({
        check: false,
        loading: false,
      });
    } else {
      // console.log('cliquei');
      await addSong(music);
      this.setState({
        check: true,
        loading: false,
      });
    }
  }

  render() {
    const { trackName, previewUrl, music, trackId } = this.props;
    const { check, loading, arrayFavoriteMusic } = this.state;
    // console.log(this.props);
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <div>
          <label htmlFor="favorites">
            <p> Favorite </p>
            { loading ? <Loading /> : null }
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${music.trackId}` }
              onChange={ (event) => this.handleFavorites(event, music) }
              checked={ !check
                ? arrayFavoriteMusic.some((song) => song.trackId === trackId)
                : check }
            />
          </label>
        </div>

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;
export default MusicCard;
