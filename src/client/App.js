import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Feeds from 'client/Feeds';
import Home from 'client/Home';
import PostPage from 'client/PostPage';
import Posts from 'client/Posts';
import Styles from 'client/Styles';
import Header from 'client/Header';

export default class App extends Component<{||}> {
  componentDidMount() {
    const body = document.body;
    if (body) {
      body.classList.toggle('light-theme', false);
      body.classList.toggle('dark-theme', true);
    }
  }

  render() {
    return(
      <Router>
        <div className="app__content">
          <Header
            username="gabesoft"
            subscribedCount={35}
            newPostCount={12}
            onLoginClick={() => undefined}
          />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/feeds">Feeds</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/post/xyz">Post XYZ</Link>
            </li>
            <li>
              <Link to="/styles">Styles</Link>
            </li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home} />
          <Route path="/feeds" component={Feeds} />
          <Route path="/posts" component={Posts} />
          <Route path="/post/:postId" component={PostPage} />
          <Route path="/styles" component={Styles} />
        </div>
      </Router>
    );
  }
}
