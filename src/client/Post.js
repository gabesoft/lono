import * as React from 'react';

import { Elevation } from 'rmwc';

import icon from 'client/Icons';

const ELEVATION_UNFOCUSED: 1 = 1;
const ELEVATION_FOCUSED: 4 = 4;

type Props = {
  id: string,
  author: string,
  title: string,
  summary?: string,
  date: string,
  isNew: boolean,
  link: string,
  onRead: (id: string) => void
};

type State = {
  elevation: typeof ELEVATION_UNFOCUSED | typeof ELEVATION_FOCUSED
};

export default class Post extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      elevation: ELEVATION_UNFOCUSED
    };
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
          <div className="post__author">{this.props.author}</div>
          <div className="post__actions">{icon('dots-vertical')}</div>
        </div>

        <div className="post__content">
          <div className="post__title">
            {this.props.title}
          </div>
          <div className="post__summary">
            {this.props.summary}
          </div>
        </div>

        <div className="post__footer">
          <div className="post__date">
            {this.props.date}
          </div>
          <div className="post__status">
            {this.props.isNew ? 'new' : null}
          </div>
        </div>
      </Elevation>
    );
  }
}
