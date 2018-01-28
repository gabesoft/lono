import * as React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { connect } from 'react-redux';

import {
  authSetInitialized,
  authSetInfo,
  authClear
} from 'client/actions/auth';

import {
  fetchPostsIfNeeded
} from 'client/actions/posts';

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
  isInitialized: boolean
};

class App extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isInitialized: false
    };

    authService.once('init-success', this.onAuthInitSuccess);
    authService.once('init-failure', this.onAuthInitFailure);
  }

  componentDidMount() {
    updateTheme();
    authService.init();
  }

  componentDidUpdate() {
    this.props.dispatch(fetchPostsIfNeeded());
  }

  onAuthInitFailure() {
    this.props.dispatch(authSetInitialized());
    this.setState({ isInitialized: true });
  }

  onAuthInitSuccess() {
    this.props.dispatch(authSetInitialized());
    this.props.dispatch(authSetInfo(authService.authInfo));

    this.setState({
      isInitialized: true
    });
  }

  onSignInClick() {
    authService.once('signin-success', this.onAuthInitSuccess);
    authService.signIn();
  }

  onSignOutSuccess() {
    this.props.dispatch(authClear());
  }

  onSignOutClick() {
    authService.once('signout-success', this.onSignOutSuccess);
    authService.signOut();
  }

  doRenderLoginPage() {
    return (
      <LoginPage onLoginClick={this.onSignInClick} />
    );
  }

  render() {
    if (!this.state.isInitialized) {
      return <Loader />;
    }

    return(
      <Router>
        <div className="app__content">
          <Header onSignOutClick={this.onSignOutClick} />

          <Route
            path={pageService.login}
            render={this.doRenderLoginPage}
          />

          <PrivateRoute path={pageService.home} component={Home} exact />
          <PrivateRoute path={pageService.feeds} component={FeedList} />
          <PrivateRoute path={pageService.posts} component={PostList} />
          <PrivateRoute path={pageService.post} component={PostPage} />
          <PrivateRoute path={pageService.styles} component={Styles} />
        </div>
      </Router>
    );
  }
}

export default connect()(App);