import * as React from 'react';

import {
  Elevation
} from 'rmwc';

const ELEVATION_UNFOCUSED: 0 = 0;
const ELEVATION_FOCUSED: 4 = 4;

type Props = {
  children?: React.Node,
  className?: string,
  elevatedClassName?: string
};

type State = {
  elevation: typeof ELEVATION_UNFOCUSED | typeof ELEVATION_FOCUSED
};

export default class Elevated extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      elevation: ELEVATION_UNFOCUSED,
      actionsOpen: false
    };
  }

  render() {
    const elevated = this.state.elevation === ELEVATION_FOCUSED;
    const elevatedClassName = this.props.elevatedClassName || '';
    const className = `${this.props.className || ''} ${elevated ? elevatedClassName : ''}`;

    return (
      <Elevation
        z={this.state.elevation}
        transition
        className={className}
        onMouseOver={() => this.setState({ elevation: ELEVATION_FOCUSED })}
        onFocus={() => this.setState({ elevation: ELEVATION_FOCUSED })}
        onMouseOut={() => this.setState({ elevation: ELEVATION_UNFOCUSED })}
        onBlur={() => this.setState({ elevation: ELEVATION_UNFOCUSED })}
      >
        {this.props.children}
      </Elevation>
    );
  }
}