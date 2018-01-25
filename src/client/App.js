import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import authService from 'client/AuthService';
import pageService from 'client/PageService';
import { updateTheme } from 'client/ThemeSwitch';

import BaseComponent from 'client/BaseComponent';
import Feeds from 'client/Feeds';
import Header from 'client/Header';
import Home from 'client/Home';
import Loader from 'client/Loader';
import LoginPage from 'client/LoginPage';
import PostPage from 'client/PostPage';
import Posts from 'client/Posts';
import PrivateRoute from 'client/PrivateRoute';
import Styles from 'client/Styles';

type Props = {};

type State = {
  isAuthenticated: boolean,
  isInitialized: boolean,
  profileName: ?string
};

export default class App extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isAuthenticated: authService.isSignedIn,
      isInitialized: false,
      profileName: null
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
      isInitialized: true,
      profileName: authService.profileGivenName
    });
  }

  componentDidMount() {
    updateTheme();
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
            profileName={this.state.profileName}
            isAuthenticated={this.state.isAuthenticated}
            subscribedCount={34}
            newPostCount={18}
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
