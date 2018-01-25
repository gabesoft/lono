import * as React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { connect } from 'react-redux';

import {
  authSetAuthenticated,
  authSetInitialized,
  authSetUser,
  authClear
} from 'client/actions/auth';

import authService from 'client/services/auth';
import pageService from 'client/services/page';
import { updateTheme } from 'client/ThemeSwitch';

import BaseComponent from 'client/BaseComponent';
import FeedList from 'client/FeedList';
import Header from 'client/Header';
import Home from 'client/Home';
import Loader from 'client/Loader';
import LoginPage from 'client/LoginPage';
import PostList from 'client/PostList';
import PostPage from 'client/PostPage';
import PrivateRoute from 'client/PrivateRoute';
import Styles from 'client/Styles';


type Props = {
  dispatch: Function
};

type State = {
  isAuthenticated: boolean,
  isInitialized: boolean
};

class App extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isAuthenticated: authService.isSignedIn,
      isInitialized: false
    };

    authService.once('init-success', this.onAuthInitSuccess);
    authService.once('init-failure', this.onAuthInitFailure);

    // TODO: maybe do this in the login page
    //       or remove the handler on componentWillUnmount
    authService.on('signin-success', this.onAuthInitSuccess);
  }

  onAuthInitFailure() {
    this.props.dispatch(authSetInitialized());
    this.setState({ isInitialized: true });
  }

  onAuthInitSuccess() {
    this.props.dispatch(authSetInitialized());
    this.props.dispatch(authSetAuthenticated(authService.isSignedIn));
    this.props.dispatch(authSetUser(authService.userProfile));

    this.setState({
      isAuthenticated: authService.isSignedIn,
      isInitialized: true
    });
  }

  onSignOutSuccess() {
    this.props.dispatch(authClear());
    this.setState({ isAuthenticated: authService.isSignedIn });
  }

  onSignOutClick() {
    authService.once('signout-success', this.onSignOutSuccess);
    authService.signOut();
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
          <Header onSignOutClick={this.onSignOutClick} />

          <Route path={pageService.login} component={LoginPage} />

          <PrivateRoute
            isAuthenticated={this.state.isAuthenticated}
            exact path={pageService.home}
            component={Home}
          />
          <PrivateRoute
            isAuthenticated={this.state.isAuthenticated}
            path={pageService.feeds}
            component={FeedList}
          />
          <PrivateRoute
            isAuthenticated={this.state.isAuthenticated}
            path={pageService.posts}
            component={PostList}
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

export default connect()(App);