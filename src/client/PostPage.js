import * as React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BaseComponent from 'client/BaseComponent';
import PostView from 'client/PostView';

import type { Match } from 'react-router-dom';
import type { ReduxState } from 'client/types/ReduxState';
import type { UserPost } from 'client/types/Post';

type Props = {
  match: Match
};

type UiProps = {
  userPost: ?UserPost,
  userPostId: string
};

const mapDispatchToProps = () => ({});

const mapStateToProps = (state: ReduxState, props: Props) => {
  const userPostId = props.match.params.postId;
  const posts = state.posts.items;
  const userPost = posts.find(p => p._id === userPostId);
  return { userPostId, userPost };
};

class PostPage extends BaseComponent<UiProps, {}> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.updateTitle();
  }

  componentDidUpdate() {
    this.updateTitle();
  }

  updateTitle() {
    const title = this.props.userPost && this.props.userPost.title;
    document.title = title || '';
  }

  render() {
    const { userPost, userPostId, ...rest } = this.props;

    if (!userPost) {
      return (
        <div>
          A post with id {userPostId} was not found
        </div>
      );
    }

    return (
      <PostView userPost={userPost} {...rest} />
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage));
