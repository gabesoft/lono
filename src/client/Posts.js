import * as React from 'react';

import posts from 'client/data-posts';

import {
  Grid,
  GridCell
} from 'rmwc';

import Post from 'client/Post';

type Props = {

};

type State = {
  posts: Array<Object>
};

export default class Posts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      posts
    };
  }

  renderPosts() {
    return this.state.posts.map(feed => {
      return (
        <GridCell key={feed.postId} className="posts__post" phone="4" tablet="4" desktop="3">
          <Post
            id={feed.postId}
            author={feed.post.author}
            title={feed.post.title}
            feedTitle={feed.title}
            summary={feed.post.summary}
            link={feed.post.link}
            date={feed.post.date}
            isNew={!feed.read}
            onOpenClick={() => undefined}
            onEditTagsClick={() => undefined}
          />
        </GridCell>
      );
    });
  }

  render () {
    return (
      <Grid className="posts">
        {this.renderPosts()}
      </Grid>
    );
  }
}
