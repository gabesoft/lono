import * as React from 'react';

import moment from 'moment';
import icon from 'client/Icons';

import Avatar from 'client/Avatar';
import Elevated from 'client/Elevated';

import {
  Link
} from 'react-router-dom';

import {
  Button,
  SimpleMenu,
  MenuAnchor,
  MenuItem
} from 'rmwc';

import type {
  UserPost
} from 'client/CommonTypes';

type Props = {
  userPost: UserPost,
  onOpenClick: (id: string) => void,
  onEditTagsClick: (id: string) => void
};

type State = {
  actionsOpen: boolean
};

export default class Post extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      actionsOpen: false
    };
  }

  renderMenuItem(iconName: string, text: string, clickHandler: Function) {
    return (
      <MenuItem className="post__actions_menu-item" onClick={clickHandler}>
        {icon(iconName)}
        <span>{text}</span>
      </MenuItem>
    );
  }

  getClass(baseClass: string, newClass: string) {
    const isNew = !this.props.userPost.read;
    return `${baseClass} ${isNew ? newClass : ''}`;
  }

  render() {
    const userPost = this.props.userPost;
    const isNew = !this.props.userPost.read;
    const handler= (fn: Function) => {
      return () => {
        this.setState({ actionsOpen: false });
        fn(userPost.postId);
      }
    };

    return (
      <Elevated
        className={this.getClass('post', 'post_new')}
        elevatedClassName="post_elevated"
      >
        <div className={this.getClass('post__header', 'post__header_new')}>
          <Avatar className="post__avatar" text={userPost.title} />
          <span className="post__feed-title">{userPost.title}</span>
          <div className="post__actions">
            <MenuAnchor>
              <Button onClick={() => this.setState({ actionsOpen: true })}>
                {icon('dots-vertical')}
              </Button>

              <SimpleMenu
                open={this.state.actionsOpen}
                onClose={() => this.setState({ actionsOpen: false })}
              >
                {this.renderMenuItem('open-in-new', 'Open in new window', handler(this.props.onOpenClick))}
                {this.renderMenuItem('tag', 'Edit tags', handler(this.props.onEditTagsClick))}
              </SimpleMenu>
            </MenuAnchor>
          </div>
        </div>

        <Link to={`/post/${userPost._id}`} className="post__content">
          <div className="post__title">
            {userPost.post.title}
          </div>
          <div className="post__summary">
            {userPost.post.summary}
          </div>
        </Link>

        <div className="post__footer">
          <div className="post__date-author">
            <span className="post__author">
              {userPost.post.author}
            </span>
            <span className="post__date">
              {moment(userPost.post.date).fromNow()}
            </span>
          </div>
          <div className="post__status">
            {isNew ? 'new' : null}
          </div>
        </div>
      </Elevated>
    );
  }
}

