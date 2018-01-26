import * as React from 'react';

import type { Match } from 'react-router-dom';

import posts from 'client/data-posts';
import PostView from 'client/PostView';

import type {
  UserPost
} from 'client/types/Post';

type Props = {
  match: Match
};

export default class PostPage extends React.Component<Props, {||}> {
  render () {
    const userPostId = this.props.match.params.postId;
    const userPost: ?UserPost = posts.find(p => p._id === userPostId);

    if (userPost) {
      return (
        <PostView userPost={userPost} />
      );
    } else {
      return (
        <div>
          A post with id {userPostId} was not found
        </div>
      );
    }
  }
}
