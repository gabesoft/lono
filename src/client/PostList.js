import * as React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Grid,
  GridCell
} from 'rmwc';

import BaseComponent from 'client/BaseComponent';
import Post from 'client/Post';

import type { ReduxState } from 'client/types/ReduxState';
import type { UserPost } from 'client/types/Post';

type Props = {
  isFetching: boolean,
  lastUpdated: Date,
  posts: Array<UserPost>
};

type State = {

};

const mapDispatchToProps = () => ({});

const mapStateToProps = (state: ReduxState) => {
  return {
    isFetching: state.posts.isFetching,
    lastUpdated: state.posts.lastUpdated,
    posts: state.posts.items
  };
};

class PostList extends BaseComponent<Props, State> {
  renderPosts() {
    const posts = this.props.posts;

    return posts.map((userPost, i) => {
      return (
        <GridCell key={i} className="post-list__post" phone="4" tablet="4" desktop="3">
          <Post
            userPost={userPost}
            onOpenClick={() => undefined}
            onEditTagsClick={() => undefined}
          />
        </GridCell>
      );
    });
  }

  render () {
    return (
      <Grid className="post-list">
        {this.renderPosts()}
      </Grid>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));