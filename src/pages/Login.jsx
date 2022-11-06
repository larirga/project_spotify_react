import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
      loading: false,
      createUserState: false,
    };
    this.handleClickUser = this.handleClickUser.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  async handleClickUser(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const { name } = this.state;
    await createUser({ name });
    this.setState({
      createUserState: true,
    });
  }

  handleOnChange({ target }) {
    const enabled = (target.value.length > 2);
    this.setState({
      name: target.value,
      disabledButton: !enabled,
    });
  }

  render() {
    const { disabledButton, loading, createUserState } = this.state;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        {createUserState && <Redirect to="/search" />}
        {loading && <Loading />}
        <form onSubmit={ this.handleClickUser }>
          <label htmlFor="login">
            Nome:
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleOnChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disabledButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
