import * as React from 'react';

import ReactAutosuggest from 'react-autosuggest';

import BaseComponent from 'client/BaseComponent';

import {
  REASON_FOCUSED,
  REASON_CHANGED,
  ESCAPE_PRESSED,
  SUGGESTIONS_REVEALED,
  SUGGESTION_SELECTED,
  CLICK,
  ENTER,
  ENTER_KEY
} from 'client/Constants';

export type BaseSuggestion = {
  name?: string,
  title: string
};

export type SuggestionFetch = {
  value: string,
  reason: typeof REASON_FOCUSED
        | typeof REASON_CHANGED
        | typeof ESCAPE_PRESSED
        | typeof SUGGESTIONS_REVEALED
        | typeof SUGGESTION_SELECTED
};

export type SuggestionSelected<T> = {
  suggestion: T,
  suggestionValue: string,
  suggestionIndex: number,
  method: typeof CLICK | typeof ENTER
};

export function addSuggestionName<Suggestion: BaseSuggestion>(item: Suggestion, pattern: RegExp): Suggestion {
  return Object.assign({}, {
    name: item.title.replace(pattern, '<mark>$1</mark>')
  }, item);
}

export function filterSuggestions<Suggestion: BaseSuggestion>(suggestions: Array<Suggestion>, value: string = ''): Array<Suggestion> {
  const pattern = new RegExp(`(${value.toLowerCase().trim()})`);
  return suggestions
    .filter(t => t.title.match(pattern))
    .map(t => addSuggestionName(t, pattern));
}

type Props<Suggestion> = {
  getSuggestions: (value: string) => Array<Suggestion>,
  highlightFirstSuggestion?: boolean,
  inline?: boolean,
  inputClassName?: string,
  inputId?: string,
  inputLabel?: string,
  inputName?: string,
  onInputChange: (event: SyntheticInputEvent<HTMLInputElement>, props: Object) => void,
  onInputKeyDown?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onSuggestionSelected: (event: SyntheticEvent<HTMLElement>, data: Suggestion) => void,
  onFreeFormSelected?: (event: SyntheticEvent<HTMLElement>, data: string) => void,
  renderInputComponent?: (props: Object) => React.Node,
  renderSuggestion?: (suggestion: Suggestion, name: React.Node) => React.Node,
  value: string
};

type State<Suggestion> = {
  suggestions: Array<Suggestion>
};

const THEME = Object.freeze({
  container: 'autosuggest__container',
  containerOpen: 'autosuggest__container_open',
  input: 'autosuggest__input',
  inputOpen: 'autosuggest__input_open',
  inputFocused: 'autosuggest__input_focused',
  suggestionsContainer: 'autosuggest__suggestions-container',
  suggestionsContainerOpen: 'autosuggest__suggestions-container_open',
  suggestionsList: 'autosuggest__suggestions-list',
  suggestion: 'autosuggest__suggestion',
  suggestionFirst: 'autosuggest__suggestion_first',
  suggestionHighlighted: 'autosuggest__suggestion_highlighted',
  sectionContainer: 'autosuggest__section-container',
  sectionContainerFirst: 'autosuggest__section-container_first',
  sectionTitle: 'autosuggest__section-title'
});

export default class Autosuggest<Suggestion: BaseSuggestion> extends BaseComponent<Props<Suggestion>, State<Suggestion>> {
  suggestionSelected: boolean

  constructor(props: Props<Suggestion>) {
    super(props);

    this.suggestionSelected = false;
    this.state = {
      suggestions: props.getSuggestions('')
    };
  }

  getTheme() {
    const theme = Object.assign({}, THEME);
    if (this.props.inline) {
      theme.container = `${theme.container} autosuggest_inline`;
    }
    return theme;
  }

  onSuggestionSelected(event: SyntheticEvent<HTMLElement>, { suggestion }: SuggestionSelected<Suggestion>) {
    this.props.onSuggestionSelected(event, suggestion);
    this.suggestionSelected = true;
  }

  onSuggestionsFetchRequested({ value }: SuggestionFetch) {
    this.setState({
      suggestions: this.props.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  onKeyDown(event: SyntheticKeyboardEvent<HTMLInputElement>) {
    const enter = event.keyCode === ENTER_KEY;
    const value = this.props.value;

    if (enter && !this.suggestionSelected && this.props.onFreeFormSelected) {
      this.props.onFreeFormSelected(event, value);
    }

    this.props.onInputKeyDown && this.props.onInputKeyDown(event);
    this.suggestionSelected = false;
  }

  onChange(event: SyntheticInputEvent<HTMLInputElement>, props: Object) {
    this.props.onInputChange && this.props.onInputChange(event, props);
  }

  doRenderSuggestion(suggestion: Suggestion): React.Node {
    const name = React.createElement('span', {
      dangerouslySetInnerHTML: { __html: suggestion.name }
    });

    if (this.props.renderSuggestion) {
      return this.props.renderSuggestion(suggestion, name);
    } else {
      return name;
    }
  }

  render() {
    const inputProps = {
      type: 'text',
      label: this.props.inputLabel,
      name: this.props.inputName,
      id: this.props.inputId,
      value: this.props.value,
      className: this.props.inputClassName,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };

    return (
      <ReactAutosuggest
        getSuggestionValue={(item) => item.title}
        highlightFirstSuggestion={this.props.highlightFirstSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        renderInputComponent={this.props.renderInputComponent}
        renderSuggestion={this.doRenderSuggestion}
        suggestions={this.state.suggestions}
        shouldRenderSuggestions={value => value.trim().length > 0}
        theme={this.getTheme()}
      />
    );
  }
}