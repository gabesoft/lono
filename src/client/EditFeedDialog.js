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

type Suggestion = {
  title: string,
  name?: string
};

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
  suggestions: Array<Suggestion>
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

  addName(item: Suggestion, pattern: RegExp): Suggestion {
    return Object.assign({}, {
      name: item.title.replace(pattern, '<mark>$1</mark>')
    }, item);
  }

  getSuggestions(value: string = ''): Array<Suggestion> {
    const input = value.toLowerCase().trim();
    const pattern = new RegExp(`(${input})`);
    return TAGS
      .filter(t => t.title.match(pattern))
      .map(t => this.addName(t, pattern));
  }

  onSuggestionsFetchRequested({ value }: SuggestionFetch) {
    this.setState({ suggestions: this.getSuggestions(value) });
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  onSuggestionSelected(event: SyntheticEvent<HTMLElement>, { suggestion }: SuggestionSelected<Suggestion>) {
    const tags = this.state.tags;
    tags.push(suggestion.title);
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
      id: 'edit-tags-input',
      name: 'tags',
      type: 'text',
      label: 'Feed Tags',
      onChange,
      onKeyDown,
      value: this.state.value,
      className: 'edit-feed-dialog__tags-input-input'
    };

    const renderSuggestion = (suggestion: Suggestion) => {
      return React.createElement('span', {
        dangerouslySetInnerHTML: { __html: suggestion.name }
      });
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
        suggestions={this.state.suggestions}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInputComponent}
        getSuggestionValue={(item) => item}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        highlightFirstSuggestion={true}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        inputProps={inputProps}
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
    const removeClass = `${classNameRemove} tag__remove`

    const remove = (
      <button className={removeClass} onClick={() => onRemove(key)}>
        {icon('close')}
      </button>
    );

    return (
      <div key={key} className="tag">
        <span>{getTagDisplayValue(tag)}</span>
        {!disabled && remove}
      </div>
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