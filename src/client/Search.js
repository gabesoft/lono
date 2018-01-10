import * as React from 'react';

import icon from 'client/Icons';

import Autosuggest, { filterSuggestions } from 'client/Autosuggest';

import type {
  BaseSuggestion
} from 'client/Autosuggest'

export type Suggestion = BaseSuggestion & {
  type: typeof STATUS | typeof FEED | typeof TAG
};

type Props = {
  value: string,
  className?: string
};

type State = {
  suggestions: Array<Suggestion>,
  value: string
};

const STATUS: 'status' = 'status';
const FEED: 'feed' = 'feed';
const TAG: 'tag' = 'tag';

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

  renderSuggestion(suggestion: Suggestion, name: React.Node) {
    return (
      <div className="search__suggestion">
        {icon(ICONS[suggestion.type] || ICONS[suggestion.title])}
        {name}
      </div>
    );
  }

  getSuggestions(value: string = ''): Array<Suggestion> {
    const input = value.toLowerCase();
    const length = input.length;
    const parts = input.replace(/[()]/g, '').split(/[|&!]/);
    const last = parts[parts.length - 1].trim();
    return length === 0 ? [] : filterSuggestions(SUGGESTIONS, last);
  }

  onSuggestionSelected(event: SyntheticEvent<HTMLElement>, suggestion: Suggestion) {
    const prev = this.state.value.replace(/([^|&!()]+)$/, '');
    const separator = prev.match(/[!(]$/) ? '' : ' ';
    const value = [ prev, suggestion.title ].filter(Boolean).join(separator);
    this.setState({ value });
  }

  render() {
    const className = `search ${this.props.className || ''}`;

    return (
      <div className={className}>
        <Autosuggest
          getSuggestions={this.getSuggestions.bind(this)}
          highlightFirstSuggestion={true}
          inputClassName="search__input"
          inputName="search"
          onInputChange={event => this.setState({ value: event.target.value })}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          renderSuggestion={this.renderSuggestion.bind(this)}
          value={this.state.value}
        />
      </div>
    );
  }
}
