import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     check: false,
  //     loading: false,
  //     arrayFavoriteMusic: [],
  //   };
  // }

  // async componentDidMount() {
  //   const favoritesMusics = await getFavoriteSongs();
  //   this.setState({
  //     arrayFavoriteMusic: favoritesMusics,
  //   });
  // }

  // async handleFavorites(event, music) {
  //   this.setState({
  //     loading: true,
  //   }, () => {});
  //   if (!event.target.checked) {
  //     await removeSong(music);
  //     this.setState({
  //       check: false,
  //       loading: false,
  //     });
  //   } else {
  //     // console.log('cliquei');
  //     await addSong(music);
  //     this.setState({
  //       check: true,
  //       loading: false,
  //     });
  //   }
  // }

  render() {
    const { trackName, previewUrl, music, checkbox, handleChange } = this.props;
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
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${music.trackId}` }
              onChange={ handleChange }
              checked={ checkbox }
              name={ trackName }
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
