import {
  REASON_FOCUSED,
  REASON_CHANGED,
  ESCAPE_PRESSED,
  SUGGESTIONS_REVEALED,
  SUGGESTION_SELECTED,
  CLICK,
  ENTER
} from 'client/Constants';

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
}
