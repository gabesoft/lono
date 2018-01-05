import * as React from 'react';

import {
  Button,
  Dialog,
  DialogRoot,
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
          <TextFieldHelperText>Enter an RSS feed url or youtube channel-external-id</TextFieldHelperText>
        </DialogBody>
      );
    }
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogRoot className="add-feed-dialog">
          <DialogSurface>
            <DialogHeader className="add-feed-dialog__header">
              {this.renderHeaderTitle()}
            </DialogHeader>
            {this.renderBody()}
            <DialogFooter className="add-feed-dialog__footer">
              <Button onClick={this.props.onCancel}>Cancel</Button>
              <Button onClick={() => this.props.onAccept(this.state.value)} raised>Add</Button>
            </DialogFooter>
          </DialogSurface>
          <DialogBackdrop />
        </DialogRoot>
      </Dialog>
    );
  }
}