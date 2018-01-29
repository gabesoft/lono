import * as React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BaseComponent from 'client/BaseComponent';
import PostView from 'client/PostView';

import type { Match } from 'react-router-dom';
import type { ReduxState } from 'client/types/ReduxState';
import type { UserPost } from 'client/types/Post';
import type { Feed } from 'client/types/Feed';

type Props = {
  match: Match
};

type UiProps = {
  userPost: ?UserPost,
  userPostId: string,
  feed: Feed
};

const mapDispatchToProps = () => ({});

const mapStateToProps = (state: ReduxState, props: Props) => {
  const userPostId = props.match.params.postId;
  const posts = state.posts.items;
  const feeds = state.feeds.items;
  const userPost = posts.find(p => p._id === userPostId);
  const feed = userPost ? feeds.find(f => f._id === userPost.feedId) : null;
  return { userPostId, userPost, feed };
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
        <div className="post-view">
          <h3>
            A post with id {userPostId} was not found
          </h3>
        </div>
      );
    }

    return (
      <PostView userPost={userPost} {...rest} />
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage));
