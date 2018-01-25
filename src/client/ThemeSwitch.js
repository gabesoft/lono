import * as React from 'react';

import {
  Switch
} from 'rmwc';

const DARK_THEME: 'dark-theme' = 'dark-theme';
const LIGHT_THEME: 'light-theme' = 'light-theme';
const USER_THEME = 'user-theme';

type Props = {
  text?: string,
  className?: string
};

type State = {
  theme: typeof DARK_THEME | typeof LIGHT_THEME
};

export function updateTheme(dark?: boolean) {
  const storage = window.localStorage;
  const body = document.body;
  const forceDark = dark === true;
  const forceLight = dark === false;
  const current = (storage && storage.getItem(USER_THEME)) || LIGHT_THEME;
  const theme = forceDark ? DARK_THEME : (forceLight ? LIGHT_THEME : current);

  if (body) {
    body.classList.toggle(DARK_THEME, theme === DARK_THEME);
    body.classList.toggle(LIGHT_THEME, theme !== DARK_THEME);
  }

  window.localStorage.setItem(USER_THEME, theme);
}

export function getCurrentTheme() {
  return window.localStorage.getItem(USER_THEME) || LIGHT_THEME;
}

export default class ThemeSwitch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      theme: LIGHT_THEME
    };
  }

  componentDidMount() {
    updateTheme();
    this.setState({ theme: getCurrentTheme() });
  }

  switchTheme(event: SyntheticInputEvent<HTMLElement>) {
    updateTheme(event.target.checked);
    this.setState({ theme: getCurrentTheme() });
  }

  render() {
    return (
      <Switch
        className={this.props.className}
        checked={this.state.theme === DARK_THEME }
        onChange={event => this.switchTheme(event)}
      >
        {this.props.text || 'Dark Theme'}
      </Switch>
    );
  }
}
