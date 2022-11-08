import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      listMusic: [],
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
  }

  render() {
    const { artistName, albumName, listMusic } = this.state;
    // console.log(listMusic);
    return (
      <div data-testid="page-album">
        <Header />
        <h2>Album</h2>
        <h3 data-testid="artist-name">{ artistName }</h3>
        <p data-testid="album-name">{ albumName }</p>
        {listMusic.map((music) => (
          <MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            music={ music }
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
