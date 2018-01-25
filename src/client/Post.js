import * as React from 'react';

import getIcon from 'client/services/icon';
import pageService from 'client/services/page';

import Avatar from 'client/Avatar';
import AuthorDate from 'client/AuthorDate';
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
        className="post__menu-item"
        onClick={this.props.onEditTagsClick}>
        {getIcon('tag')}
        <span>Edit tags</span>
      </MenuItem>
    );
  }

  renderOpenMenuItem() {
    return (
      <MenuItem
        className="post__menu-item"
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
    const parser = (new DOMParser).parseFromString(userPost.post.summary || '', 'text/html');
    const summaryText = parser.documentElement && parser.documentElement.textContent;
    const summary = (!summaryText || summaryText == 'null') ? '' : summaryText;

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

        <Link to={pageService.postPath(userPost._id)} className="post__content">
          <div className="post__title">
            {post.title}
          </div>
          <div className="post__summary">
            {summary}
          </div>
        </Link>

        <div className="post__footer">
          <AuthorDate
            className="post__author-date"
            date={post.date}
            author={post.author}
          />
          <div className="post__status">
            {isNew ? 'new' : null}
          </div>
        </div>
      </Elevated>
    );
  }
}

