import * as React from 'react';

import Avatar from 'client/Avatar';
import AuthorDate from 'client/AuthorDate';

import {
  Grid,
  GridCell
} from 'rmwc';

import type {
  UserPost
} from 'client/CommonTypes';

type Props = {
  userPost: UserPost
};

type State = {

};

// TODO: extract dateAuthor into own component

export default class PostView extends React.Component<Props, State> {
  render() {
    const userPost = this.props.userPost;
    const post = userPost.post;
    const description = React.createElement('div', {
      dangerouslySetInnerHTML: { __html: post.description }
    });

    return (
      <Grid className="post-view">
        <GridCell className="post-view__header" span="12">
          <div className="post-view__avatar-feed-title">
            <Avatar className="post-view__avatar" text={userPost.title} />
            <span className="post-view__feed-title">
              {userPost.title}
            </span>
          </div>
          <AuthorDate
            className="post-view__author-date"
            author={post.author}
            date={post.date}
          />
        </GridCell>

        <GridCell className="post-view__title" span="12">
          <a rel="canonical" href={post.link}>
            {post.title}
          </a>
        </GridCell>

        <GridCell className="post-view__description" span="12">
          {description}
        </GridCell>
      </Grid>
    );
  }
}