import * as React from 'react';

import BaseComponent from 'client/BaseComponent';
import posts from 'client/data-posts';

import {
  Grid,
  GridCell
} from 'rmwc';

import Post from 'client/Post';

import type {
  UserPost
} from 'client/CommonTypes';

type Props = {

};

type State = {
  posts: Array<UserPost>
};

export default class PostList extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      posts
    };
  }

  renderPosts() {
    return this.state.posts.map((userPost, i) => {
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
