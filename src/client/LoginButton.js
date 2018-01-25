import * as React from 'react';

import BaseComponent from 'client/BaseComponent';
import getIcon from 'client/services/icon';

import {
  Button
} from 'rmwc';

type Props = {
  onClick: () => void
};

type State = {

};

export default class LoginButton extends BaseComponent<Props, State> {
  render() {
    return (
      <Button raised className="login-button" onClick={this.props.onClick}>
        {getIcon('google')}
        <span className="login-button__title">Sign in with Google</span>
      </Button>
    );
  }
}
