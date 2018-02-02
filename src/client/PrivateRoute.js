import * as React from 'react';

import {
  Redirect,
  Route,
  withRouter
} from 'react-router-dom';

import { connect } from 'react-redux';

import type {
  RouterHistory,
  Match,
  Location
} from 'react-router-dom';

import type { ReduxState } from 'types/ReduxState';

type Props = {
  component: React.ComponentType<*>,
  isAuthenticated: boolean,
  [string]: string | boolean | RouterHistory | Match | Location
};

type State = {};

const mapStateToProps = (state: ReduxState, { component, ...rest }) => {
  return {
    ...rest,
    component,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = () => ({});

class PrivateRoute extends React.Component<Props, State> {
  renderRoute(props: Object) {
    const loginRoute = { pathname: '/login', state: { from: props.location } }
    const { component: Component, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (<Component {...props} />);
    } else {
      return (<Redirect to={loginRoute} />);
    }
  }

  render() {
    const routeProps = Object.assign({}, this.props, { component: undefined });

    return (
      <Route {...routeProps} render={props => this.renderRoute(props)} />
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));

