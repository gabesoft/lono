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
  return { dispatch };
};

const mapStateToProps = (state: ReduxState) => {
  return {
    isFetching: state.feeds.isFetching || state.subscriptions.isFetching,
    lastUpdated: state.feeds.lastUpdated,
    feeds: state.feeds.items,
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

  render () {
    return (
      <Grid className="feed-list">
        {this.renderFeeds()}
      </Grid>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedList));
