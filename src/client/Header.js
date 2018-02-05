import * as React from 'react';

import Headroom from 'react-headroom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  MenuAnchor,
  SimpleMenu,
  MenuItem
} from 'rmwc';

import BaseComponent from 'client/BaseComponent';
import Optional from 'client/Optional';
import Search from 'client/Search';
import ThemeSwitch from 'client/ThemeSwitch';
import getIcon from 'client/services/icon';

import type { ReduxState } from 'types/ReduxState';
import type { UserProfile } from 'types/UserProfile';

type UiProps = {
  userProfile: ?UserProfile,
  isAuthenticated: boolean,
  subscribedCount: number,
  newPostCount: number,
  onSignOutClick: Function
};

type UiState = {
  isMenuOpen: boolean
};

type ContainerProps = {
  onSignOutClick: Function
};

const mapStateToProps = (state: ReduxState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userProfile: state.auth.userProfile,
    subscribedCount: 37,
    newPostCount: 14
  };
}

const mapDispatchToProps = (dispatch, props: ContainerProps) => {
  return {
    onSignOutClick: props.onSignOutClick
  }
};

class Header extends BaseComponent<UiProps, UiState> {
  constructor(props: UiProps) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  onMenuClick() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  onMenuClose() {
    this.setState({ isMenuOpen: false });
  }

  onSignOut() {
    this.setState({ isMenuOpen: false });
    this.props.onSignOutClick();
  }

  renderUserMenu() {
    const user = this.props.userProfile || {};
    const name = user.givenName || user.email;
    const fullName = user.name;
    const email = user.email;
    const image = user.imageUrl;

    return (
      <MenuAnchor>
        <button className="header__menu-button" onClick={this.onMenuClick}>{name}</button>

        <SimpleMenu open={this.state.isMenuOpen} onClose={this.onMenuClose}>
          <MenuItem
            className="header__menu-item header__user-detail"
            onClick={() => this.setState({ isMenuOpen: false })}
          >
            <Optional canRender={!!image}>
              <img className="header__user-image" alt="" src={image} />
            </Optional>
            <span className="header__user-fullname">{fullName || email}</span>
          </MenuItem>
          <MenuItem className="header__menu-item" onClick={this.onSignOut}>
            {getIcon('logout')}
            <span>Log Out</span>
          </MenuItem>
        </SimpleMenu>
      </MenuAnchor>
    );
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
          {this.renderUserMenu()}
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
        <img className="logo" alt="logo" src="lono-dragon-transparent.png"/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
