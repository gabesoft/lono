import * as React from 'react';

import Avatar from 'client/Avatar';
import Elevated from 'client/Elevated';
import Optional from 'client/Optional';
import getIcon from 'client/services/icon';
import util from 'client/services/util';

import AuthorDate from 'client/AuthorDate';

import {
  Button,
  SimpleMenu,
  MenuAnchor,
  MenuItem
} from 'rmwc';

import type { Feed, Subscription } from 'types/Feed';

type Props = {
  feed: Feed,
  subscription?: Subscription,
  onSubscribeClick: (id: string) => void,
  onEditClick: (id: string) => void,
  onDeleteClick: (id: string) => void
};

type State = {
  actionsOpen: boolean
};

export default class FeedItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      actionsOpen: false
    };
  }

  renderMenuItem(iconName: string, text: string, onClick: Function) {
    return (
      <MenuItem className="feed-item__actions_menu-item" onClick={onClick}>
        {getIcon(iconName)}
        <span>{text}</span>
      </MenuItem>
    );
  }

  renderSubscribeMenuItem() {
    const subscribed = !!this.props.subscription;
    const icon = subscribed ? 'playlist-remove' : 'playlist-check';
    const text = subscribed ? 'Unsubscribe from feed' : 'Subscribe to feed';

    return this.renderMenuItem(icon, text, () => {
      this.setState({ actionsOpen: false });
      this.props.onSubscribeClick(this.props.feed._id);
    });
  }

  renderOpenFeedMenuItem() {
    return (
      <MenuItem className="feed-item__actions_menu-item" onClick={() => this.setState({ actionsOpen: false })}>
        <a href={this.props.feed.link} target="_blank">
          {getIcon('open-in-new')}
          <span>Open feed in new window</span>
        </a>
      </MenuItem>
    );
  }

  renderOpenRssMenuItem() {
    return (
      <MenuItem className="feed-item__actions_menu-item" onClick={() => this.setState({ actionsOpen: false })}>
        <a href={this.props.feed.uri} target="_blank">
          {getIcon('rss')}
          <span>Open RSS in new window</span>
        </a>
      </MenuItem>
    );
  }

  renderActionsMenu() {
    const handler = (fn: Function) => {
      return () => {
        this.setState({ actionsOpen: false });
        fn(this.props.feed._id);
      }
    };

    return (
      <div className="feed-item__actions">
        <MenuAnchor>
          <Button onClick={() => this.setState({ actionsOpen: true })}>
            {getIcon('dots-vertical')}
          </Button>

          <SimpleMenu
            open={this.state.actionsOpen}
            onClose={() => this.setState({ actionsOpen: false })}
          >
            {this.renderMenuItem('pencil', 'Edit subscription', handler(this.props.onEditClick))}
            {this.renderOpenFeedMenuItem()}
            {this.renderOpenRssMenuItem()}
            {this.renderSubscribeMenuItem()}
            {this.renderMenuItem('trash', 'Delete feed', handler(this.props.onDeleteClick))}
          </SimpleMenu>
        </MenuAnchor>
      </div>
    );
  }

  render() {
    const { feed, subscription } = this.props;
    const title = subscription && subscription.title || feed.title;
    const unreadCount = subscription && subscription.unreadCount;
    const description = util.extractText(feed.description);

    return (
      <Elevated className="feed-item" elevatedClassName="feed-item_elevated">
        <div className="feed-item__header">
          <div className="feed-item__title">
            {title}
          </div>
          {this.renderActionsMenu()}
        </div>
        <div className="feed-item__content">
          <div className="feed-item__description">
            {description}
          </div>
        </div>
        <div className="feed-item__footer">
          <AuthorDate
            className="feed-item__author-date"
            date={feed.lastPostDate}
            author={feed.author}
          />
          <div className="feed-item__post-counts">
            <span className="feed-item__post-count">
              {feed.postCount}
            </span>
            <Optional canRender={!!unreadCount}>
              <span className="feed-item__unread-count">
                {unreadCount}
              </span>
            </Optional>
          </div>
        </div>
      </Elevated>
    );
  }
}
