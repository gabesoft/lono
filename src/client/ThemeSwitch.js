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

export default class ThemeSwitch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      theme: LIGHT_THEME
    };
  }

  componentDidMount() {
    const body = document.body;
    const theme = window.localStorage.getItem(USER_THEME) || LIGHT_THEME;

    if (body) {
      body.classList.toggle(DARK_THEME, theme === DARK_THEME);
      body.classList.toggle(LIGHT_THEME, theme !== DARK_THEME);

      const isDark = body.classList.contains(DARK_THEME);
      this.setState({ theme: isDark ? DARK_THEME : LIGHT_THEME });
    }
  }

  switchTheme(event: SyntheticInputEvent<HTMLElement>) {
    const body = document.body;
    const checked = event.target.checked;

    if (body) {
      body.classList.toggle(LIGHT_THEME, !checked);
      body.classList.toggle(DARK_THEME, checked);
    }

    const theme = checked ? DARK_THEME : LIGHT_THEME;

    this.setState({ theme });
    window.localStorage.setItem(USER_THEME, theme);
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
