import * as React from 'react';

import icon from 'client/Icons';
import Avatar from 'client/Avatar';
import Elevated from 'client/Elevated';

import {
  Button,
  Menu,
  MenuAnchor,
  MenuItem
} from 'rmwc';

type Props = {
  id: string,
  author?: string,
  title: string,
  lastPostDate: string,
  postCount: number,
  unreadCount: number,
  link: string,
  uri: string,
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
        {icon(iconName)}
        <span>{text}</span>
      </MenuItem>
    );
  }

  render () {
    const author = this.props.author ? `by ${this.props.author}` : null;
    const handler = (fn: Function) => {
      return () => {
        this.setState({ actionsOpen: false });
        fn(this.props.id);
      }
    };

    return (
      <Elevated className="feed">
        <div className="feed__header">
          <Avatar text={this.props.title} />
          <div className="feed__actions">
            <MenuAnchor>
              <Button onClick={() => this.setState({ actionsOpen: true })}>
                {icon('dots-vertical')}
              </Button>

              <Menu
                open={this.state.actionsOpen}
                onClose={() => this.setState({ actionsOpen: false })}
              >
                {this.renderMenuItem('edit', 'Edit subscription', handler(this.props.onEditClick))}
                {this.renderMenuItem('open-in-new', 'Open feed in new window', handler(this.props.onOpenFeedClick))}
                {this.renderMenuItem('rss', 'Open rss in new window', handler(this.props.onOpenRssClick))}
                {this.renderMenuItem('plus', 'Subscribe to feed', handler(this.props.onSubscribeClick))}
                {this.renderMenuItem('delete', 'Delete feed', handler(this.props.onDeleteClick))}
              </Menu>
            </MenuAnchor>
          </div>
        </div>
        <div className="feed__content">
          <div className="feed__title">
            {this.props.title}
          </div>
          <div className="feed__author">
            {author}
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
            <div className="feed__unread-count">
              {this.props.unreadCount}
            </div>
          </div>
        </div>
      </Elevated>
    );
  }
}
