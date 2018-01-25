import * as React from 'react';

import Autosuggest, { filterSuggestions } from 'client/Autosuggest';
import BaseComponent from 'client/BaseComponent';
import ReactTagsInput from 'react-tagsinput';
import Tag from 'client/Tag';

import uuid from 'uuid/v4';

import {
  TextField
} from 'rmwc';

import {
  DELETE_KEY,
  ENTER,
} from 'client/Constants';

type Props = {
  inputLabel: string,
  onTagsChange: (tags: Array<string>) => void,
  suggestions: Array<BaseSuggestion>,
  tags: Array<string>
};

type State = {
  value: string
}

import type {
  BaseSuggestion
} from 'client/Autosuggest';

export default class TagsInput extends BaseComponent<Props, State> {
  tagsInput: ?HTMLElement
  prevInput: ?HTMLElement
  titleInput: ?HTMLElement
  inputChanged: boolean
  inputId: string

  constructor(props: Props) {
    super(props);
    this.inputId = uuid();
    this.state = {
      value: ''
    };
  }

  componentDidUpdate() {
    if (this.inputChanged && this.tagsInput && this.tagsInput.focus) {
      this.tagsInput.focus();
      this.inputChanged = false;
    }
  }

  onTagsChange(tags: Array<string>) {
    this.props.onTagsChange(tags);
  }

  onSuggestionSelected(event: SyntheticEvent<HTMLElement>, suggestion: BaseSuggestion) {
    this.onFreeFormSelected(event, suggestion.title);
  }

  onFreeFormSelected(event: SyntheticEvent<HTMLElement>, value: string) {
    const tags = this.props.tags;
    tags.push(value.trim());
    this.props.onTagsChange(tags);
    this.setState({ value: '' });
  }

  onRenderTagsLayout(tagComponents: React.Node, inputComponents: React.Node) {
    return (
      <div className="tags-input__tags">
        {tagComponents}
        {inputComponents}
      </div>
    );
  }

  updateTagsInput(input: HTMLElement) {
    if (!this.inputChanged) {
      this.inputChanged = this.prevInput !== null && input !== null && this.prevInput !== input;
    }
    this.prevInput = this.tagsInput;
    this.tagsInput = input;
  }

  onRenderInput(props: Object) {
    if (this.props.tags.length > 0) {
      return (
        <input {...props}
          ref={input => this.updateTagsInput(input)}
          className="tags-input__input"
        />
      );
    } else {
      return (
        <TextField {...props}
          className="tags-input__text-field"
          ref={field => this.updateTagsInput(field && field.mdcApi.input_)} />
      );
    }
  }

  onRenderAutosuggestInput() {
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
      const tags = this.props.tags;
      const value = event.currentTarget.value;

      if (remove && tags.length > 0 && value === '') {
        event.preventDefault();
        tags.pop();
        this.props.onTagsChange(tags);
      }
    };

    return (
      <Autosuggest
        inline
        getSuggestions={value => filterSuggestions(this.props.suggestions, value)}
        highlightFirstSuggestion={false}
        inputId={this.inputId}
        inputName="tags"
        inputLabel={this.props.inputLabel}
        onInputChange={onChange}
        onInputKeyDown={onKeyDown}
        onSuggestionSelected={this.onSuggestionSelected}
        onFreeFormSelected={this.onFreeFormSelected}
        renderInputComponent={this.onRenderInput}
        value={this.state.value}
      />
    );
  }

  renderTagsLabel() {
    if (this.props.tags.length === 0) {
      return null;
    }

    return (
      <label htmlFor={this.inputId} className="tags-input__title">
        {this.props.inputLabel}
      </label>
    );
  }

  onRenderTag(props: Object) {
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

  render() {
    return (
      <div className="tags-input">
        {this.renderTagsLabel()}
        <ReactTagsInput
          value={this.props.tags}
          renderInput={this.onRenderAutosuggestInput}
          renderTag={this.onRenderTag}
          renderLayout={this.onRenderTagsLayout}
          onChange={this.onTagsChange}
        />
      </div>
    );
  }
}