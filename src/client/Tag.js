import * as React from 'react';

import icon from 'client/Icons';

type Props = {
  title: string,
  className?: string,
  renderRemove?: boolean,
  removeClassName?: string,
  onRemoveClick?: () => void
};

type State = {};

export default class Tag extends React.Component<Props, State> {
  renderRemove() {
    if (!this.props.renderRemove) {
      return null;
    }

    const removeClass = `${this.props.removeClassName || ''} tag__remove`

    return (
      <button className={removeClass} onClick={this.props.onRemoveClick}>
        {icon('close')}
      </button>
    );
  }

  render() {
    const className = `${this.props.className || ''} tag`;
    return (
      <div className={className}>
        <span>{this.props.title}</span>
        {this.renderRemove()}
      </div>
    );
  }
}