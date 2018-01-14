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

type Props = {
  id: string,
  author: string,
  title: string,
  feedTitle: string,
  summary?: string,
  date: string,
  isNew: boolean,
  link: string,
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
    return `${baseClass} ${this.props.isNew ? newClass : ''}`;
  }

  render() {
    const handler= (fn: Function) => {
      return () => {
        this.setState({ actionsOpen: false });
        fn(this.props.id);
      }
    };

    return (
      <Elevated className={this.getClass('post', 'post_new')}>
        <div className={this.getClass('post__header', 'post__header_new')}>
          <Avatar className="post__avatar" text={this.props.feedTitle} />
          <span className="post__feed-title">{this.props.feedTitle}</span>
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

        <Link to={`/post/${this.props.id}`} className="post__content">
          <div className="post__title">
            {this.props.title}
          </div>
          <div className="post__summary">
            {this.props.summary}
          </div>
        </Link>

        <div className="post__footer">
          <div className="post__date-author">
            <span className="post__author">
              {this.props.author}
            </span>
            <span className="post__date">
              {moment(this.props.date).fromNow()}
            </span>
          </div>
          <div className="post__status">
            {this.props.isNew ? 'new' : null}
          </div>
        </div>
      </Elevated>
    );
  }
}

