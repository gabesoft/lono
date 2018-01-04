import * as React from 'react';

import Headroom from 'react-headroom';

import Search from 'client/Search';
import Optional from 'client/Optional';

type Props = {
  username: string,
  subscribedCount?: number,
  newPostCount?: number
};

type State = {

};

export default class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Headroom disableInlineStyles>
        <div className="header">
          <div className="header__logo">
            <img className="logo" alt="logo" src="https://via.placeholder.com/128x128"/>
          </div>
          <Search className="header__search" value="" />
          <div className="header__user-info">
            <div className="header__username">
              {this.props.username}
            </div>
            <Optional canRender={!!this.props.subscribedCount}>
              <div className="header__subscribed-count">
                {this.props.subscribedCount} Subscriptions
              </div>
            </Optional>
            <Optional canRender={!!this.props.newPostCount}>
              <div className="header__new-post-count">
                {this.props.newPostCount} Unread Posts
              </div>
            </Optional>
          </div>
        </div>
      </Headroom>
    );
  }
}
