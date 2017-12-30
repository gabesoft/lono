import * as React from 'react';

import icon from 'client/Icons';
import Avatar from 'client/Avatar';

import { Link } from 'react-router-dom';

import {
  Button,
  Elevation,
  Menu,
  MenuAnchor,
  MenuItem
} from 'rmwc';

const ELEVATION_UNFOCUSED: 1 = 1;
const ELEVATION_FOCUSED: 4 = 4;

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
  elevation: typeof ELEVATION_UNFOCUSED | typeof ELEVATION_FOCUSED,
  actionsOpen: boolean
};

export default class Post extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      elevation: ELEVATION_UNFOCUSED,
      actionsOpen: false
    };
  }

  onOpenClick() {
    this.setState({ actionsOpen: false });
    this.props.onOpenClick(this.props.id);
  }

  onEditTagsClick() {
    this.setState({ actionsOpen: false });
    this.props.onEditTagsClick(this.props.id);
  }

  renderMenuItem(iconName: string, text: string, onClick: Function) {
    return (
      <MenuItem className="post__actions_menu-item" onClick={onClick}>
        {icon(iconName)}
        <span>{text}</span>
      </MenuItem>
    );
  }

  render () {
    return (
      <Elevation
        z={this.state.elevation}
        transition
        className="post"
        onMouseOver={() => this.setState({ elevation: ELEVATION_FOCUSED })}
        onFocus={() => this.setState({ elevation: ELEVATION_FOCUSED })}
        onMouseOut={() => this.setState({ elevation: ELEVATION_UNFOCUSED })}
        onBlur={() => this.setState({ elevation: ELEVATION_UNFOCUSED })}
      >
        <div className="post__header">
          <div className="post__feed-title">
            <Avatar text={this.props.feedTitle} />
            <span>{this.props.feedTitle}</span>
          </div>
          <div className="post__actions">
            <MenuAnchor>
              <Button onClick={() => this.setState({ actionsOpen: true })}>
                {icon('dots-vertical')}
              </Button>

              <Menu
                open={this.state.actionsOpen}
                onClose={() => this.setState({ actionsOpen: false })}
              >
                {this.renderMenuItem('open-in-new', 'Open in new window', () => this.onOpenClick())}
                {this.renderMenuItem('tag', 'Edit tags', () => this.onEditTagsClick())}
              </Menu>
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
              {'3 hours ago'}
            </span>
          </div>
          <div className="post__status">
            {this.props.isNew ? 'new' : null}
          </div>
        </div>
      </Elevation>
    );
  }
}
