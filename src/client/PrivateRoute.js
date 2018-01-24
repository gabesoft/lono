import * as React from 'react';

import {
  Redirect,
  Route
} from 'react-router-dom';


type Props = {
  component: React.ComponentType<*>,
  isAuthenticated: boolean,
  [string]: string | boolean
};

type State = {};

export default class PrivateRoute extends React.Component<Props, State> {
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
