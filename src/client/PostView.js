import * as React from 'react';

import type {
  UserPost
} from 'client/CommonTypes';

type Props = {
  userPost: UserPost
};

type State = {

};

export default class PostView extends React.Component<Props, State> {
  render () {
    return (
      <div>
        <h1>Post View</h1>
      </div>
    );
  }
}