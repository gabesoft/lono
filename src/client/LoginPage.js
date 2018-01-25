import * as React from 'react';

import authService from 'client/AuthService';
import pageService from 'client/PageService';

import BaseComponent from 'client/BaseComponent';
import LoginButton from 'client/LoginButton';

import {
  Redirect
} from 'react-router-dom';

type Props = {
  location: Object
};

type State = {
  redirectToReferrer: boolean,
};

export default class LoginPage extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  onLoginClick() {
    authService.once('signin-success', () => this.setState({
      redirectToReferrer: authService.isSignedIn
    }));

    authService.signIn();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: pageService.home } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className="login-page">
        <h1>Welcome to the ultimate feed reader</h1>
        <h3>Sign in to continue...</h3>
        <LoginButton onClick={this.onLoginClick} />
      </div>
    );
  }
}
