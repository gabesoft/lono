import * as React from 'react';

import Headroom from 'react-headroom';

import Optional from 'client/Optional';
import Search from 'client/Search';
import ThemeSwitch from 'client/ThemeSwitch';
import BaseComponent from 'client/BaseComponent';

type Props = {
  profileName: ?string,
  isAuthenticated: boolean,
  subscribedCount?: number,
  newPostCount?: number
};

type State = {

};

export default class Header extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  renderUserInfo() {
    if (!this.props.isAuthenticated) {
      return (
        <div className="header__logged-out">
          Logged Out
        </div>
      );
    }

    return (
      <div className="header__user-info">
        <div className="header__username">
          {this.props.profileName}
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
    );
  }

  renderRight() {
    return (
      <div className="header__right">
        {this.renderUserInfo()}
        <div className="header__theme-switch">
          <ThemeSwitch />
        </div>
      </div>
    );
  }

  renderLeft() {
    return (
      <div className="header__left">
        <img className="logo" alt="logo" src="https://via.placeholder.com/128x128"/>
      </div>
    );
  }

  render() {
    return (
      <Headroom disableInlineStyles>
        <div className="header">
          {this.renderLeft()}
          <Search className="header__center" value="" />
          {this.renderRight()}
        </div>
      </Headroom>
    );
  }
}
