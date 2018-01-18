import * as React from 'react';

import moment from 'moment';

type Props = {
  author?: ?string,
  date: string,
  className?: string
};

type State = {

};

export default class AuthorDate extends React.Component<Props, State> {
  renderAuthor() {
    const author = this.props.author;

    if (!author) {
      return null;
    }

    return (
      <span className="author-date__author">
        {author}
      </span>
    );
  }

  render() {
    const className = `${this.props.className || ''} author-date`;

    return (
      <div className={className}>
        {this.renderAuthor()}
        <span className="author-date__date">
          {moment(this.props.date).fromNow()}
        </span>
      </div>
    )
  }
}
