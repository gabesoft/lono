import * as React from 'react';

import Avatar from 'client/Avatar';
import Elevated from 'client/Elevated';
import Optional from 'client/Optional';
import getIcon from 'client/services/icon';

import {
  Button,
  SimpleMenu,
  MenuAnchor,
  MenuItem
} from 'rmwc';

type Props = {
  id: string,
  author?: string,
  title: string,
  description?: string,
  lastPostDate?: string,
  postCount: number,
  unreadCount?: number,
  link: string,
  uri: string,
  subscribed: boolean,
  onEditClick: (id: string) => void,
  onOpenFeedClick: (id: string) => void,
  onOpenRssClick: (id: string) => void,
  onSubscribeClick: (id: string) => void,
  onDeleteClick: (id: string) => void,
};

type State = {
  actionsOpen: boolean
};

export default class Feed extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      actionsOpen: false
    };
  }

  renderMenuItem(iconName: string, text: string, onClick: Function) {
    return (
      <MenuItem className="feed__actions_menu-item" onClick={onClick}>
        {getIcon(iconName)}
        <span>{text}</span>
      </MenuItem>
    );
  }

  renderSubscribeMenuItem() {
    const subscribed = this.props.subscribed;
    const icon = subscribed ? 'playlist-remove' : 'playlist-check';
    const text = subscribed ? 'Unsubscribe from feed' : 'Subscribe to feed';

    return this.renderMenuItem(icon, text, () => {
      this.setState({ actionsOpen: false });
      this.props.onSubscribeClick(this.props.id);
    });
  }

  render() {
    const handler = (fn: Function) => {
      return () => {
        this.setState({ actionsOpen: false });
        fn(this.props.id);
      }
    };

    return (
      <Elevated className="feed">
        <div className="feed__header">
          <div className="feed__avatar-author">
            <Avatar text={this.props.title} />
            <span>{this.props.author}</span>
          </div>
          <div className="feed__actions">
            <MenuAnchor>
              <Button onClick={() => this.setState({ actionsOpen: true })}>
                {getIcon('dots-vertical')}
              </Button>

              <SimpleMenu
                open={this.state.actionsOpen}
                onClose={() => this.setState({ actionsOpen: false })}
              >
                {this.renderMenuItem('pencil', 'Edit subscription', handler(this.props.onEditClick))}
                {this.renderMenuItem('open-in-new', 'Open feed in new window', handler(this.props.onOpenFeedClick))}
                {this.renderMenuItem('rss', 'Open rss in new window', handler(this.props.onOpenRssClick))}
                {this.renderSubscribeMenuItem()}
                {this.renderMenuItem('trash', 'Delete feed', handler(this.props.onDeleteClick))}
              </SimpleMenu>
            </MenuAnchor>
          </div>
        </div>
        <div className="feed__content">
          <div className="feed__title">
            {this.props.title}
          </div>
          <div className="feed__description">
            {this.props.description}
          </div>
        </div>
        <div className="feed__footer">
          <div className="feed__last-post-date">
            {this.props.lastPostDate}
          </div>
          <div className="feed__post-counts">
            <span className="feed__post-count">
              {this.props.postCount}
            </span>
            <Optional canRender={!!this.props.unreadCount}>
              <span className="feed__unread-count">
                {this.props.unreadCount}
              </span>
            </Optional>
          </div>
        </div>
      </Elevated>
    );
  }
}
