import * as React from 'react';

import pageService from 'client/services/page';

import BaseComponent from 'client/BaseComponent';
import LoginButton from 'client/LoginButton';

import { connect } from 'react-redux';

import {
  Redirect,
  withRouter
} from 'react-router-dom';

import type { Location } from 'react-router-dom';
import type { ReduxState } from 'client/types/ReduxState';

type UiProps = {
  location: Object,
  isAuthenticated: boolean,
  onLoginClick: Function
};

type ContainerProps = {
  onLoginClick: Function,
  location: Location
}

const mapStateToProps = (state: ReduxState, props: ContainerProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    location: props.location
  };
};

const mapDispatchToProps = (dispatch, props: ContainerProps) => {
  return {
    onLoginClick: props.onLoginClick
  }
};

class LoginPage extends BaseComponent<UiProps, {}> {
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
