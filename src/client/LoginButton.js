import * as React from 'react';

import icon from 'client/Icons';
import BaseComponent from 'client/BaseComponent';

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
        {icon('google')}
        <span className="login-button__title">Sign in with Google</span>
      </Button>
    );
  }
}