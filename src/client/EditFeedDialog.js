import * as React from 'react';

import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';
import icon from 'client/Icons';

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
  ENTER
} from 'client/Constants';

import type {
  SuggestionFetch,
  SuggestionSelected
} from 'client/AutosuggestTypes';

// TODO: populate from store
const TAGS = Object.freeze([
  'design',
  'dev-tools',
  'emacs',
  'functional',
  'haskell',
  'html',
  'java',
  'javascript',
  'performance',
  'programming',
  'python',
  'scalability',
  'technology',
  'usability',
  'vim',
  'web',
  'web-design'
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
  suggestions: Array<string>
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

  getSuggestions(value: string = ''): Array<string> {
    // TODO: add <mark> to suggestions
    const input = value.toLowerCase().trim();
    const pattern = new RegExp(input);
    return TAGS.filter(item => item.match(pattern));
  }

  onSuggestionsFetchRequested({ value }: SuggestionFetch) {
    this.setState({ suggestions: this.getSuggestions(value) });
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  onSuggestionSelected(event: SyntheticEvent<HTMLElement>, { suggestion }: SuggestionSelected<string>) {
    const tags = this.state.tags;
    tags.push(suggestion);
    this.setState({ value: '', tags });
  }

  renderInput() {
    const onChange = (event, { method }) => {
      if (method === ENTER) {
        event.preventDefault();
      } else {
        this.setState({ value: event.target.value });
      }
    };

    const onKeyDown = (event) => {
      const remove = event.keyCode === DELETE_KEY || event.key === DELETE_KEY;
      const tags = this.state.tags;
      if (remove && tags.length > 0 && this.state.value === '') {
        event.preventDefault();
        tags.pop();
        this.setState({ tags });
      }
    };

    const inputProps = {
      name: 'tags',
      type: 'text',
      onChange,
      onKeyDown,
      value: this.state.value,
      className: 'edit-feed-dialog__tags-input_input'
    };

    const renderSuggestion = (suggestion) => {
      return (
        <span>{suggestion}</span>
      );
    };

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={(item) => item}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        highlightFirstSuggestion={true}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        inputProps={inputProps}
      />
    );
  }

  renderTag(props: Object) {
    const { key, tag, disabled, onRemove, getTagDisplayValue, classNameRemove } = props;
    const removeClass = `${classNameRemove} tag__remove`

    const remove = (
      <a className={removeClass} onClick={() => onRemove(key)}>
        {icon('close')}
      </a>
    );

    return (
      <div key={key} className="tag">
        <span>{getTagDisplayValue(tag)}</span>
        {!disabled && remove}
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

              <TagsInput
                className="edit-feed-dialog__tags-input"
                value={this.state.tags}
                renderInput={this.renderInput.bind(this)}
                renderTag={this.renderTag.bind(this)}
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