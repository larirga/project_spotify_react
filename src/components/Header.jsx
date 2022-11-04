import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const user = await getUser();
        this.setState({
          name: user.name,
          loading: false,
        });
      },
    );
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : (<h3 data-testid="header-user-name">{ name }</h3>)}
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}
export default Header;
