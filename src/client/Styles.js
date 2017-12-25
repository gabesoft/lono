import * as React from 'react';

import {
  Button,
  Card,
  CardAction,
  CardActions,
  CardMedia,
  CardPrimary,
  CardSubtitle,
  CardSupportingText,
  CardTitle,
  Fab,
  Menu,
  MenuItem,
  MenuAnchor,
  Icon,
  IconToggle,
  Typography
} from 'rmwc';

type State = {
  menuIsOpen: boolean
};

type Props = {};

export default class Styles extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuIsOpen: false
    };
  }

  render() {
    return(
      <div className="style-sections">
        <section className="header">
          <h1>Header 1</h1>
          <h2>Header 2</h2>
          <h3>Header 3</h3>
          <h4>Header 4</h4>
          <h5>Header 5</h5>
        </section>

        <section className="typography">
          <Typography use="display4">display4</Typography>
          <Typography use="display3">display3</Typography>
          <Typography use="display2">display2</Typography>
          <Typography use="display1">display1</Typography>
          <Typography use="headline">headline</Typography>
          <Typography use="title">title</Typography>
          <Typography use="subheading2">subheading2</Typography>
          <Typography use="subheading1">subheading1</Typography>
          <Typography use="body2">body2</Typography>
          <Typography use="body1">body1</Typography>
          <Typography use="caption">caption</Typography>
          <Typography use="button">button</Typography>
        </section>

        <section className="buttons">
          <Button>Default</Button>
          <Button raised>Raised</Button>
          <Button dense>Dense</Button>
          <Button compact>Compact</Button>
          <Button unelevated>Unelevated</Button>
          <Button stroked>Stroked</Button>
          <Button raised theme={['secondary-bg', 'text-primary-on-secondary']}>With Theme</Button>
          <Fab>favorite</Fab>
          <Fab mini>favorite</Fab>
          <IconToggle
            on={{label: 'Remove from favorites', content: 'favorite'}}
            off={{label: 'Add to favorites', content: 'favorite_border'}}
          />
          <Icon>favorite</Icon>
          <Icon use="favorite" />
        </section>

        <section className="cards">
          <Card style={{width: '320px'}}>
            <CardMedia style={{
              backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
              height: '12.313rem'
            }}>
            </CardMedia>
            <CardPrimary>
              <CardTitle large>Card Title</CardTitle>
              <CardSubtitle>Subtitle here</CardSubtitle>
            </CardPrimary>
            <CardSupportingText>
            </CardSupportingText>
            <CardActions>
              <CardAction>Action 1</CardAction>
              <CardAction>Action 2</CardAction>
            </CardActions>
          </Card>
        </section>

        <section className="menus">
          <MenuAnchor>
            <Button
              raised
              onClick={() => this.setState({'menuIsOpen': !this.state.menuIsOpen})}
            >
              Open Menu
            </Button>

            <Menu
              open={this.state.menuIsOpen}
              onClose={() => this.setState({menuIsOpen: false})}
            >
              <MenuItem>Cookies</MenuItem>
              <MenuItem>Pizza</MenuItem>
              <MenuItem>Icecream</MenuItem>
            </Menu>
          </MenuAnchor>
        </section>
      </div>
    );
  }
}
