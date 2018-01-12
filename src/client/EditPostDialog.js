import * as React from 'react';

import TagsInput from 'client/TagsInput';

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
  tags: Array<string>,
  onClose: () => void,
  onAccept: (tags: Array<string>) => void,
  onCancel: () => void
};

type State = {
  tags: Array<string>,
  value: string
};

export default class EditPostDialog extends React.Component<Props, State> {
  tagsInput: ?HTMLElement

  constructor(props: Props) {
    super(props);

    this.state = {
      tags: props.tags,
      value: ''
    };
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogRoot className="edit-post-dialog">
          <DialogSurface>
            <DialogHeader className="edit-post-dialog__header">
              <DialogHeaderTitle>Edit post</DialogHeaderTitle>
            </DialogHeader>
            <DialogBody className="edit-post__body">
              <TagsInput
                inputLabel="Post Tags"
                tags={this.state.tags}
                suggestions={TAG_SUGGESTIONS}
                onTagsChange={tags => this.setState({ tags })}
              />
            </DialogBody>
            <DialogFooter className="edit-post-dialog__footer">
              <Button onClick={this.props.onCancel}>
                Cancel
              </Button>
              <Button onClick={() => this.props.onAccept(this.state.tags)} raised>
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
