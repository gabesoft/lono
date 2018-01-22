import * as React from 'react';

import moment from 'moment';

import Optional from 'client/Optional';

type Props = {
  author?: ?string,
  date: string,
  className?: string
};

type State = {

};

export default class AuthorDate extends React.Component<Props, State> {
  render() {
    const className = `${this.props.className || ''} author-date`;

    return (
      <div className={className}>
        <Optional canRender={!!this.props.author}>
          <span className="author-date__author">
            {this.props.author}
          </span>
        </Optional>
        <Optional canRender={!!this.props.date}>
          <span className="author-date__date">
            {moment(this.props.date).fromNow()}
          </span>
        </Optional>
      </div>
    )
  }
}
