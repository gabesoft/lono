import * as React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { connect } from 'react-redux';

import {
  initializeAuth,
  signIn,
  signOut
} from 'client/actions/auth';

import {
  fetchPostsIfNeeded
} from 'client/actions/posts';

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

import type { AuthState } from 'client/types/AuthState';
import type { ReduxState } from 'client/types/ReduxState';

type Props = {
  dispatch: Function,
  auth: AuthState
};

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = (state: ReduxState) => {
  return {
    auth: state.auth
  }
};

class App extends BaseComponent<Props, {}> {
  componentDidMount() {
    updateTheme();
    this.props.dispatch(initializeAuth());
  }

  componentDidUpdate() {
    this.props.dispatch(fetchPostsIfNeeded());
  }

  doRenderLoginPage() {
    const { dispatch } = this.props;

    return (
      <LoginPage onLoginClick={() => dispatch(signIn())} />
    );
  }

  render() {
    if (!this.props.auth.isInitialized) {
      return <Loader />;
    }

    const { dispatch } = this.props;

    return(
      <Router>
        <div className="app__content">
          <Header onSignOutClick={() => dispatch(signOut())} />

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
