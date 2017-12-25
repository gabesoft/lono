import * as React from 'react';

import type { Match } from 'react-router-dom';

type Props = {
  match: Match
};

export default class Post extends React.Component<Props, {||}> {
  render () {
    const postId = this.props.match.params.postId;
    return (
      <div>
        <h1>Post {postId}</h1>
      </div>
    );
  }
}