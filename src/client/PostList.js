import * as React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Grid,
  GridCell
} from 'rmwc';

import InfiniteScroll from 'react-infinite-scroller';

import BaseComponent from 'client/BaseComponent';
import MoreLoader from 'client/MoreLoader';
import PostItem from 'client/PostItem';
import { fetchMorePosts } from 'client/actions/posts';

import type { ReduxState } from 'types/ReduxState';
import type { UserPost } from 'types/Post';

type Props = {
  isFetching: boolean,
  lastUpdated: Date,
  posts: Array<UserPost>,
  hasMore: boolean,
  loadMorePosts: (page: number) => void
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

class PostList extends BaseComponent<Props, {}> {
  renderPosts() {
    const { posts } = this.props;

    return posts.map((userPost, i) => {
      return (
        <GridCell key={i} className="post-list__post" phone="4" tablet="4" desktop="3">
          <PostItem
            userPost={userPost}
            onOpenClick={() => undefined}
            onEditTagsClick={() => undefined}
          />
        </GridCell>
      );
    });
  }

  renderLoadMore() {
    return (
      <MoreLoader
        key="load-more"
        hasMore={!!(this.props.hasMore && this.props.posts.length)}
      />
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
