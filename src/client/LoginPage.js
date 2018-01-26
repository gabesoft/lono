import * as React from 'react';

import pageService from 'client/services/page';

import BaseComponent from 'client/BaseComponent';
import LoginButton from 'client/LoginButton';

import { connect } from 'react-redux';

import {
  Redirect,
  withRouter
} from 'react-router-dom';

type Props = {
  location: Object,
  isAuthenticated: boolean,
  onLoginClick: Function
};

type State = {};

const mapStateToProps = (state, props) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    location: props.location
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLoginClick: props.onLoginClick
  }
};

class LoginPage extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: pageService.home } };
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className="login-page">
        <h1>Welcome to the ultimate feed reader</h1>
        <h3>Sign in to continue...</h3>
        <LoginButton onClick={this.props.onLoginClick} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
