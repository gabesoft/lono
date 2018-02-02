import * as React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Grid,
  GridCell
} from 'rmwc';

import InfiniteScroll from 'react-infinite-scroller';

import BaseComponent from 'client/BaseComponent';
import Post from 'client/Post';
import { fetchMorePosts } from 'client/actions/posts';
import getIcon from 'client/services/icon';

import type { ReduxState } from 'types/ReduxState';
import type { UserPost } from 'types/Post';

type Props = {
  isFetching: boolean,
  lastUpdated: Date,
  posts: Array<UserPost>,
  hasMore: boolean,
  loadMorePosts: (page: number) => void
};

type State = {

};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    loadMorePosts: page => dispatch(fetchMorePosts(page))
  };
};

const mapStateToProps = (state: ReduxState) => {
  return {
    isFetching: state.posts.isFetching,
    lastUpdated: state.posts.lastUpdated,
    hasMore: state.posts.hasMore,
    posts: state.posts.items
  };
};

class PostList extends BaseComponent<Props, State> {
  renderPosts() {
    const { posts } = this.props;

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

  renderLoadMore() {
    const hasPosts = this.props.posts.length > 0;
    const hasMore = this.props.hasMore;
    const className = `post-list__more-loader ${hasPosts && hasMore ? '' : 'post-list__more-loader_hidden'}`;

    return (
      <div key="load-more" className={className}>
        {getIcon('download')}
        <span>Loading...</span>
      </div>
    );
  }

  render () {
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={this.props.loadMorePosts}
        hasMore={this.props.hasMore}
        loader={this.renderLoadMore()}
      >
        <Grid className="post-list">
          {this.renderPosts()}
        </Grid>
      </InfiniteScroll>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
