import * as React from 'react';

import Autosuggest from 'react-autosuggest';

const STATUS: 1 = 1;
const FEED: 2 = 2;
const TAG: 3 = 3;

const REASON_CHANGED: 'input-changed' = 'input-changed';
const REASON_FOCUSED: 'input-focused' = 'input-focused';
const ESCAPE_PRESSED: 'escape-pressed' = 'escape-pressed';
const SUGGESTIONS_REVEALED: 'suggestions-revealed' = 'suggestions-revealed';
const SUGGESTION_SELECTED: 'suggestion-selected' = 'suggestion-selected';

type Props = {
  value: string,
  className?: string
};

type State = {
  suggestions: Array<Suggestion>,
  value: string
};

type Suggestion = {
  title: string,
  type: typeof STATUS | typeof FEED | typeof TAG
};

type SuggestionFetch = {
  value: string,
  reason: typeof REASON_FOCUSED
        | typeof REASON_CHANGED
        | typeof ESCAPE_PRESSED
        | typeof SUGGESTIONS_REVEALED
        | typeof SUGGESTION_SELECTED
};

// TODO compute from feeds, tags, and status
const SUGGESTIONS: Array<Suggestion> = [
  { title: ":unread", type: STATUS },
  { title: ":read", type: STATUS },
  { title: "#haskell", type: TAG },
  { title: "#programming", type: TAG },
  { title: "#web", type: TAG },
  { title: "#web-design", type: TAG },
  { title: "#design", type: TAG },
  { title: "#database", type: TAG },
  { title: "#development", type: TAG },
  { title: "#design", type: TAG },
  { title: "#front-end", type: TAG },
  { title: "@reddit-vim", type: FEED },
  { title: "@reddit-emacs", type: FEED },
  { title: "@reddit-nixos", type: FEED },
  { title: "@coding-horror", type: FEED },
  { title: "@haskell-stories", type: FEED },
  { title: "@haskell-functional", type: FEED },
  { title: "@javascript-articles", type: FEED },
  { title: "@the-java-blog", type: FEED },
  { title: "@an-innovative-web", type: FEED },
  { title: "@all-confirmation-bias", type: FEED }
];

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      suggestions: [],
      value: props.value
    };
  }

  renderSuggestion(item: Suggestion) {
    return (
      <div>
        {item.title}
      </div>
    );
  }

  getSuggestions(value: string) {
    const input = value.trim().toLowerCase();
    const length = input.length;

    if (length === 0) {
      return [];
    }

    const match = item => {
      return item.title.match(new RegExp(input))
    };

    return SUGGESTIONS.filter(match)
  }

  getSuggestionValue(item: Suggestion) {
    return item.title;
  }

  onSuggestionsFetchRequested({ value }: SuggestionFetch) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  render() {
    const className = `search ${this.props.className || ''}`;
    const inputProps = {
      name: "search",
      type: "text",
      onChange: (event) => this.setState({ value: event.target.value }),
      value: this.state.value,
      className: "search__input"
    };

    return (
      <div className={className}>
        <Autosuggest
          suggestions={this.state.suggestions}
          renderSuggestion={this.renderSuggestion.bind(this)}
          getSuggestionValue={this.getSuggestionValue.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          inputProps={inputProps}
        />
      </div>
    );
  }
}