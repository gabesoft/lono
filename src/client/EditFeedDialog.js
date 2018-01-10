import * as React from 'react';

import TagsInput from 'react-tagsinput';
import Autosuggest, { filterSuggestions } from 'client/Autosuggest';

import Tag from 'client/Tag';

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

import {
  DELETE_KEY,
  ENTER,
} from 'client/Constants';

import type {
  BaseSuggestion
} from 'client/Autosuggest';

// TODO: populate from store
const TAGS: Array<BaseSuggestion> = Object.freeze([
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
  value: string,
  suggestions: Array<BaseSuggestion>
};

export default class EditFeedDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: props.title,
      tags: props.tags,
      value: '',
      suggestions: TAGS
    };
  }

  handleTagsChange(tags: Array<string>) {
    this.setState({ tags });
  }

  onSuggestionSelected(event: SyntheticEvent<HTMLElement>, suggestion: BaseSuggestion) {
    this.onFreeFormSelected(event, suggestion.title);
  }

  onFreeFormSelected(event: SyntheticEvent<HTMLElement>, value: string) {
    const tags = this.state.tags;
    tags.push(value);
    this.setState({ value: '', tags });
  }

  renderInput() {
    const onChange = (event, { method }) => {
      if (method === ENTER) {
        event.preventDefault();
      }
      else {
        this.setState({ value: event.target.value });
      }
    };

    const onKeyDown = (event) => {
      const remove = event.keyCode === DELETE_KEY || event.key === DELETE_KEY;
      const tags = this.state.tags;
      const value = event.currentTarget.value;

      if (remove && tags.length > 0 && value === '') {
        event.preventDefault();
        tags.pop();
        this.setState({ tags });
      }
    };

    const renderInputComponent = (props) => {
      if (this.state.tags.length > 0) {
        return (
          <input {...props}/>
        );
      } else {
        return (
          <TextField {...props}/>
        );
      }
    };

    return (
      <Autosuggest
        inline
        getSuggestions={value => filterSuggestions(TAGS, value)}
        highlightFirstSuggestion={false}
        inputId="edit-tags-input"
        inputName="tags"
        inputLabel="Feed Tags"
        inputClassName="edit-feed-dialog__tags-input-input"
        onInputChange={onChange}
        onInputKeyDown={onKeyDown}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        onFreeFormSelected={this.onFreeFormSelected.bind(this)}
        renderInputComponent={renderInputComponent}
        value={this.state.value}
      />
    );
  }

  renderTagsTitle() {
    if (this.state.tags.length === 0) {
      return null;
    }

    return (
      <label htmlFor="edit-tags-input" className="edit-feed-dialog__tags-input-title">
        Feed Tags
      </label>
    );
  }

  renderTag(props: Object) {
    const { key, tag, disabled, onRemove, getTagDisplayValue, classNameRemove } = props;

    return (
      <Tag
        key={key}
        title={getTagDisplayValue(tag)}
        renderRemove={!disabled}
        removeClass={classNameRemove}
        onRemoveClick={() => onRemove(key)}
      />
    );
  }

  renderTagsLayout(tagComponents: React.Node, inputComponents: React.Node) {
    return (
      <div className="edit-feed-dialog__tags-input-tags">
        {tagComponents}
        {inputComponents}
      </div>
    );
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

              <div className="edit-feed-dialog__tags-input">
                {this.renderTagsTitle()}
                <TagsInput
                  value={this.state.tags}
                  renderInput={this.renderInput.bind(this)}
                  renderTag={this.renderTag.bind(this)}
                  renderLayout={this.renderTagsLayout.bind(this)}
                  onChange={(tags) => this.handleTagsChange(tags)}
                />
              </div>
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