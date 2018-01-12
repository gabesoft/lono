import * as React from 'react';

import Avatar from 'client/Avatar';

import {
  Button,
  Dialog,
  DialogRoot,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogBackdrop
} from 'rmwc';

type Props = {
  open: boolean,
  title: string,
  onClose: () => void,
  onAccept: (tags: Array<string>) => void,
  onCancel: () => void
};

type State = {};

export default class EditPostDialog extends React.Component<Props, State> {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogRoot className="delete-feed-dialog">
          <DialogSurface>
            <DialogHeader className="delete-feed-dialog__header">
              <Avatar text={this.props.title} />
              <DialogHeaderTitle>
                <span>{this.props.title}</span>
              </DialogHeaderTitle>
            </DialogHeader>
            <DialogBody className="delete-feed-dialog__body">
              <div className="delete-feed-dialog__content">
                Are you sure you want to delete this feed?
              </div>
            </DialogBody>
            <DialogFooter className="delete-feed-dialog__footer">
              <Button onClick={this.props.onCancel}>
                Cancel
              </Button>
              <Button onClick={this.props.onAccept} raised>
                Delete
              </Button>
            </DialogFooter>
          </DialogSurface>
          <DialogBackdrop />
        </DialogRoot>
      </Dialog>
    );
  }
}
