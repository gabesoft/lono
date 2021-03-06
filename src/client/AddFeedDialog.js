import * as React from 'react';

import {
  Button,
  Dialog,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogBackdrop,
  LinearProgress,
  TextField,
  TextFieldHelperText
} from 'rmwc';

type Props = {
  open: boolean,
  loading: boolean,
  error: ?string,
  onClose: () => void,
  onAccept: (value: string) => void,
  onCancel: () => void
};

type State = {
  value: string
};

export default class AddFeedDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  renderHeaderTitle() {
    if (this.props.loading) {
      return (
        <DialogHeaderTitle>Adding feed...</DialogHeaderTitle>
      );
    } else {
      return (
        <DialogHeaderTitle>Add a new feed</DialogHeaderTitle>
      );
    }
  }

  renderHeaderError() {
    if (!this.props.error) {
      return null;
    }

    return (
      <span className="add-feed-dialog__error">
        {this.props.error}
      </span>
    );
  }

  renderBody() {
    if (this.props.loading) {
      return (
        <DialogBody className="add-feed-dialog__body add-feed-dialog_loading">
          <div>{this.state.value}</div>
          <LinearProgress determinate={false}></LinearProgress>
        </DialogBody>
      );
    } else {
      return (
        <DialogBody className="add-feed-dialog__body">
          <TextField
            label="Feed Url"
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
          />
          <TextFieldHelperText>
            Enter an RSS feed url or youtube channel-external-id
          </TextFieldHelperText>
        </DialogBody>
      );
    }
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogSurface className="add-feed-dialog">
          <DialogHeader className="add-feed-dialog__header">
            {this.renderHeaderTitle()}
            {this.renderHeaderError()}
          </DialogHeader>
          {this.renderBody()}
          <DialogFooter className="add-feed-dialog__footer">
            <Button onClick={this.props.onCancel}>Cancel</Button>
            <Button onClick={() => this.props.onAccept(this.state.value)} raised>Add</Button>
          </DialogFooter>
        </DialogSurface>
        <DialogBackdrop />
      </Dialog>
    );
  }
}