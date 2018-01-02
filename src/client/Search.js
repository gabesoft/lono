import * as React from 'react';

type Props = {
  value: string,
  className?: string
};

type State = {
  value: string
};

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  render() {
    const className = `search ${this.props.className || ''}`;
    return (
      <div className={className}>
        <input
          className="search__input"
          name="search"
          type="text"
          onChange={(event) => this.setState({ value: event.target.value })}
          value={this.state.value}
        />
      </div>
    );
  }
}