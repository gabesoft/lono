import * as React from 'react';

import getIcon from 'client/services/icon';
import pageService from 'client/services/page';
import util from 'client/services/util';

import AuthorDate from 'client/AuthorDate';
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

import type { UserPost } from 'types/Post';

type Props = {
  userPost: UserPost,
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

  renderTagsMenuItem() {
    return (
      <MenuItem
        className="post-item__menu-item"
        onClick={this.props.onEditTagsClick}>
        {getIcon('tag')}
        <span>Edit tags</span>
      </MenuItem>
    );
  }

  renderOpenMenuItem() {
    return (
      <MenuItem
        className="post-item__menu-item"
        onClick={() => this.setState({ actionsOpen: false })}
      >
        <a href={this.props.userPost.post.link} target="_blank">
          {getIcon('open-in-new')}
          <span>Open in new window</span>
        </a>
      </MenuItem>
    );
  }

  getClass(baseClass: string, newClass: string) {
    const isNew = !this.props.userPost.read;
    return `${baseClass} ${isNew ? newClass : ''}`;
  }

  render() {
    const userPost = this.props.userPost;
    const post = userPost.post;
    const isNew = !userPost.read;
    const summary = util.extractText(userPost.post.summary);

    return (
      <Elevated
        className={this.getClass('post-item', 'post-item_new')}
        elevatedClassName="post-item_elevated"
      >
        <div className={this.getClass('post-item__header', 'post-item__header_new')}>
          <Avatar className="post-item__avatar" text={userPost.title} />
          <span className="post-item__feed-title">{userPost.title}</span>
          <div className="post-item__actions">
            <MenuAnchor>
              <Button onClick={() => this.setState({ actionsOpen: true })}>
                {getIcon('dots-vertical')}
              </Button>

              <SimpleMenu
                open={this.state.actionsOpen}
                onClose={() => this.setState({ actionsOpen: false })}
              >
                {this.renderOpenMenuItem()}
                {this.renderTagsMenuItem()}
              </SimpleMenu>
            </MenuAnchor>
          </div>
        </div>

        <Link to={pageService.postPath(userPost._id)} className="post-item__content">
          <div className="post-item__title">
            {post.title}
          </div>
          <div className="post-item__summary">
            {summary}
          </div>
        </Link>

        <div className="post-item__footer">
          <AuthorDate
            className="post-item__author-date"
            date={post.date}
            author={post.author}
          />
          <div className="post-item__status">
            {isNew ? 'new' : null}
          </div>
        </div>
      </Elevated>
    );
  }
}

