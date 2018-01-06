import * as React from 'react';

import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';

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
  title: string,
  tags: Array<string>,
  onClose: () => void,
  onAccept: (title: string, tags: Array<string>) => void,
  onCancel: () => void
};

type State = {
  title: string,
  tags: Array<string>
};

export default class EditFeedDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: props.title,
      tags: props.tags
    };
  }

  handleTagsChange(tags: Array<string>) {
    this.setState({ tags });
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogRoot className="edit-feed-dialog">
          <DialogSurface>
            <DialogHeader className="edit-feed-dialog__header">
              <DialogHeaderTitle>Edit feed</DialogHeaderTitle>
            </DialogHeader>
            <DialogBody className="edit-feed__body">
              <TextField
                label="Feed Title"
                value={this.state.title}
                onChange={(event) => this.setState({ title: event.target.value })}
              />
              <TextFieldHelperText>
                Enter a new feed title
              </TextFieldHelperText>

              <TagsInput
                value={this.state.tags}
                onChange={(tags) => this.handleTagsChange(tags)}
              />
            </DialogBody>
            <DialogFooter className="edit-feed-dialog__footer">
              <Button onClick={this.props.onCancel}>
                Cancel
              </Button>
              <Button onClick={() => this.props.onAccept(this.state.title, this.state.tags)} raised>
                Add
              </Button>
            </DialogFooter>
          </DialogSurface>
          <DialogBackdrop />
        </DialogRoot>
      </Dialog>
    );
  }
}