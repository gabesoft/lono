import * as React from 'react';

import Headroom from 'react-headroom';

import Search from 'client/Search';
import Optional from 'client/Optional';
import ThemeSwitch from 'client/ThemeSwitch';

import { Button } from 'rmwc';

type Props = {
  username?: string,
  subscribedCount?: number,
  newPostCount?: number,
  onLoginClick: () => void
};

type State = {

};

export default class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  renderUserInfo() {
    if (this.props.username) {
      return (
        <div className="header__right">
          <div className="header__user-info">
            <div className="header__username">
              {this.props.username}
            </div>
            <Optional canRender={!!(this.props.subscribedCount || this.props.newPostCount)}>
              <div className="header__subscription-info">
                (
                <Optional canRender={!!this.props.subscribedCount}>
                  <div className="header__subscribed-count">
                    {this.props.subscribedCount}
                  </div>
                </Optional>
                <Optional canRender={!!this.props.newPostCount}>
                  <div className="header__new-post-count">
                    {this.props.newPostCount}
                  </div>
                </Optional>
                )
              </div>
            </Optional>
          </div>
          <div className="header__theme-switch">
            <ThemeSwitch />
          </div>
        </div>
      );
    } else {
      return (
        <div className="header__right">
          <div className="header__username header_logged-out">
            <Button onClick={this.props.onLoginClick}>Log in</Button>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Headroom disableInlineStyles>
        <div className="header">
          <div className="header__left">
            <img className="logo" alt="logo" src="https://via.placeholder.com/128x128"/>
          </div>
          <Search className="header__center" value="" />
          {this.renderUserInfo()}
        </div>
      </Headroom>
    );
  }
}
