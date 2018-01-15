import * as React from 'react';

import TagsInput from 'client/TagsInput';

import {
  Button,
  Dialog,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogBackdrop,
  TextField,
  TextFieldHelperText
} from 'rmwc';

// TODO: populate from store
const TAG_SUGGESTIONS = Object.freeze([
  { title: 'design' },
  { title: 'dev-tools' },
  { title: 'emacs' },
  { title: 'functional' },
  { title: 'haskell' },
  { title: 'html' },
  { title: 'java' },
  { title: 'javascript' },
  { title: 'performance' },
  { title: 'programming' },
  { title: 'python' },
  { title: 'scalability' },
  { title: 'technology' },
  { title: 'usability' },
  { title: 'vim' },
  { title: 'web' },
  { title: 'web-design' }
]);

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
  tags: Array<string>,
  value: string
};

export default class EditFeedDialog extends React.Component<Props, State> {
  tagsInput: ?HTMLElement
  titleInput: ?HTMLElement

  constructor(props: Props) {
    super(props);

    this.state = {
      title: props.title,
      tags: props.tags,
      value: ''
    };
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogSurface className="edit-feed-dialog">
          <DialogHeader className="edit-feed-dialog__header">
            <DialogHeaderTitle>Edit feed</DialogHeaderTitle>
          </DialogHeader>
          <DialogBody className="edit-feed__body">
            <TextField
              label="Feed Title"
              value={this.state.title}
              onChange={(event) => this.setState({ title: event.target.value })}
              ref={field => { this.titleInput = field && field.mdcApi.input_ }}
            />
            <TextFieldHelperText>
              Enter a new feed title
            </TextFieldHelperText>

            <TagsInput
              inputLabel="Feed Tags"
              tags={this.state.tags}
              suggestions={TAG_SUGGESTIONS}
              onTagsChange={tags => this.setState({ tags })}
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
      </Dialog>
    );
  }
}
