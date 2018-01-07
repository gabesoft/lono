import * as React from 'react';

import icon from 'client/Icons';

import Autosuggest from 'react-autosuggest';

import {
  STATUS,
  FEED,
  TAG
} from 'client/Constants';

import type {
  Suggestion,
  SuggestionFetch,
  SuggestionSelected
} from 'client/AutosuggestTypes'

type Props = {
  value: string,
  className?: string
};

type State = {
  suggestions: Array<Suggestion>,
  value: string
};

const ICONS = Object.freeze({
  'tag': 'tag',
  'feed': 'rss',
  ':unread': 'new-box',
  ':read': 'read',
  'status': null
});


// TODO compute from feeds, tags, and status
const SUGGESTIONS: Array<Suggestion> = Object.freeze([
  { title: ":unread", type: STATUS },
  { title: ":read", type: STATUS },
  { title: "#haskell", type: TAG },
  { title: "#programming", type: TAG },
  { title: "#web", type: TAG },
  { title: "#web-design", type: TAG },
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
]);

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      suggestions: [],
      value: props.value
    };
  }

  shouldRenderSuggestions(value: string = '') {
    return value.trim().length > 0;
  }

  renderSuggestion(item: Suggestion) {
    const name = React.createElement('span', {
      dangerouslySetInnerHTML: {__html: item.name}
    });

    return (
      <div className="search__suggestion">
        <div className="search__suggestion_info">
          {icon(ICONS[item.type] || ICONS[item.title])}
          {name}
        </div>
      </div>
    );
  }

  addName(item: Suggestion, pattern: RegExp): Suggestion {
    return Object.assign({}, {
      name: item.title.replace(pattern, '<mark>$1</mark>')
    }, item);
  }

  getSuggestions(value: string = ''): Array<Suggestion> {
    const input = value.toLowerCase();
    const length = input.length;
    const parts = input.replace(/[()]/g, '').split(/[|&!]/);
    const last = parts[parts.length - 1].trim();

    if (length === 0) {
      return [];
    }

    const pattern = new RegExp(`(${last})`);
    const match = item => {
      return item.title.match(pattern)
    };

    return SUGGESTIONS
      .filter(match)
      .map(s => this.addName(s, pattern));
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

  onSuggestionSelected(event: SyntheticEvent<HTMLElement>, { suggestion }: SuggestionSelected<Suggestion>) {
    const prev = this.state.value.replace(/([^|&!()]+)$/, '');
    const separator = prev.match(/[!(]$/) ? '' : ' ';
    const value = [ prev, suggestion.title ].filter(Boolean).join(separator);
    this.setState({ value });
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
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          shouldRenderSuggestions={this.shouldRenderSuggestions.bind(this)}
          highlightFirstSuggestion={true}
          inputProps={inputProps}
        />
      </div>
    );
  }
}
