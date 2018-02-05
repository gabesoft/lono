import * as React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Grid,
  GridCell
} from 'rmwc';

import InfiniteScroll from 'react-infinite-scroller';

import BaseComponent from 'client/BaseComponent';
import FeedItem from 'client/FeedItem';
import MoreLoader from 'client/MoreLoader';
import { fetchMoreFeeds } from 'client/actions/feeds';

import type { Feed, Subscription } from 'types/Feed';
import type { ReduxState } from 'types/ReduxState';

type Props = {
  isFetching: boolean,
  feeds: Array<Feed>,
  subscriptions: Array<Subscription>,
  hasMore: boolean,
  loadMoreFeeds: (page: number) => void
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    loadMoreFeeds: page => dispatch(fetchMoreFeeds(page))
  };
};

const mapStateToProps = (state: ReduxState) => {
  return {
    isFetching: state.feeds.isFetching || state.subscriptions.isFetching,
    lastUpdated: state.feeds.lastUpdated,
    feeds: state.feeds.items,
    hasMore: state.feeds.hasMore,
    subscriptions: state.subscriptions.items
  };
};


class FeedList extends BaseComponent<Props, {}> {
  renderFeeds() {
    const { feeds, subscriptions } = this.props;
    const subscriptionsMap = (subscriptions || []).reduce((acc, sub) => {
      acc[sub.feedId] = sub;
      return acc;
    }, {});

    return feeds.map((feed, i) => {
      return (
        <GridCell key={i} className="feed-list__feed" phone="12" tablet="12" desktop="6">
          <FeedItem
            feed={feed}
            subscription={subscriptionsMap[feed._id]}
            onDeleteClick={() => undefined}
            onSubscribeClick={() => undefined}
            onEditClick={() => undefined}
          />
        </GridCell>
      );
    });
  }

  renderLoadMore() {
    return (
      <MoreLoader
        key="load-more"
        hasMore={!!(this.props.hasMore && this.props.feeds.length)}
      />
    );
  }

  render () {
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={this.props.loadMoreFeeds}
        hasMore={this.props.hasMore}
        loader={this.renderLoadMore()}
      >
        <Grid className="feed-list">
          {this.renderFeeds()}
        </Grid>
      </InfiniteScroll>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedList));
