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
  TextField,
  TextFieldHelperText
} from 'rmwc';

type Props = {
  open: boolean,
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

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogRoot className="add-feed-dialog">
          <DialogSurface>
            <DialogHeader className="add-feed-dialog__header">
              <DialogHeaderTitle>Add a new feed</DialogHeaderTitle>
            </DialogHeader>
            <DialogBody className="add-feed-dialog__body">
              <TextField
                label="Feed Url"
                value={this.state.value}
                onChange={(event) => this.setState({ value: event.target.value })}
              />
              <TextFieldHelperText>Enter an RSS feed url or youtube channel-external-id</TextFieldHelperText>
            </DialogBody>
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