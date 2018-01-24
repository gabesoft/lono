import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import authService from 'client/AuthService';
import pageService from 'client/PageService';

import BaseComponent from 'client/BaseComponent';
import Feeds from 'client/Feeds';
import Home from 'client/Home';
import PostPage from 'client/PostPage';
import Posts from 'client/Posts';
import Styles from 'client/Styles';
import Header from 'client/Header';
import LoginPage from 'client/LoginPage';
import PrivateRoute from 'client/PrivateRoute';
import Loader from 'client/Loader';

type Props = {};

type State = {
  isAuthenticated: boolean,
  isInitialized: boolean
};

export default class App extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isAuthenticated: authService.isSignedIn,
      isInitialized: false
    };

    authService.once('init-success', this.onAuthInitSuccess);
    authService.once('init-failure', this.onAuthInitFailure);
  }

  onAuthInitFailure() {
    this.setState({ isInitialized: true });
  }

  onAuthInitSuccess() {
    this.setState({
      isAuthenticated: authService.isSignedIn,
      isInitialized: true
    });
  }

  componentDidMount() {
    authService.init();
  }

  render() {
    if (!this.state.isInitialized) {
      return <Loader />;
    }

    return(
      <Router>
        <div className="app__content">
          <Header
            username="gabesoft"
            subscribedCount={35}
            newPostCount={12}
            onLoginClick={() => undefined}
          />

          <Route path={pageService.login} component={LoginPage} />

          <PrivateRoute
            isAuthenticated={this.state.isAuthenticated}
            exact path={pageService.home}
            component={Home}
          />
          <PrivateRoute
            isAuthenticated={this.state.isAuthenticated}
            path={pageService.feeds}
            component={Feeds}
          />
          <PrivateRoute
            isAuthenticated={this.state.isAuthenticated}
            path={pageService.posts}
            component={Posts}
          />
          <PrivateRoute
            isAuthenticated={this.state.isAuthenticated}
            path={pageService.post}
            component={PostPage}
          />
          <PrivateRoute
            isAuthenticated={this.state.isAuthenticated}
            path={pageService.styles}
            component={Styles}
          />
        </div>
      </Router>
    );
  }
}
