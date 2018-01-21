import * as React from 'react';

import icon from 'client/Icons';

import AddFeedDialog from 'client/AddFeedDialog';
import EditFeedDialog from 'client/EditFeedDialog';
import DeleteFeedDialog from 'client/DeleteFeedDialog';
import EditPostDialog from 'client/EditPostDialog';

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
  Drawer,
  DrawerContent,
  DrawerHeader,
  Fab,
  Grid,
  GridCell,
  Icon,
  ListItem,
  ListItemText,
  MenuAnchor,
  MenuItem,
  Radio,
  SimpleMenu,
  Snackbar,
  Theme,
  Typography
} from 'rmwc';

type State = {
  addFeedError: ?string,
  addFeedLoading: boolean,
  addFeedOpen: boolean,
  editFeedOpen: boolean,
  deleteFeedOpen: boolean,
  editPostOpen: boolean,
  menu1IsOpen: boolean,
  menu2IsOpen: boolean,
  open: boolean,
  snackbarIsOpen: boolean,
  snackbarStartIsOpen: boolean,
  post1IsNew: boolean,
  post2IsNew: boolean,
  feed1IsSubscribed: boolean,
  feed2IsSubscribed: boolean,
  theme: string,
};

type Props = {};

export default class Styles extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      addFeedError: null,
      addFeedLoading: false,
      addFeedOpen: false,
      editFeedOpen: false,
      deleteFeedOpen: false,
      editPostOpen: false,
      menu1IsOpen: false,
      menu2IsOpen: false,
      open: false,
      snackbarIsOpen: false,
      snackbarStartIsOpen: false,
      post1IsNew: true,
      post2IsNew: false,
      feed1IsSubscribed: false,
      feed2IsSubscribed: true,
      theme: 'dark'
    };
  }

  componentDidMount() {
    const body = document.body;

    if (body) {
      const isDark = body.classList.contains('dark-theme');
      this.setState({ theme: isDark ? 'dark' : 'light' });
    }
  }

  onAddFeedAccept() {
    const loading: boolean = !this.state.addFeedLoading;
    const error = loading ? null : "Failed to add feed!";

    this.setState({
      addFeedLoading: loading,
      addFeedError: error
    });
  }

  onThemeChanged(event: SyntheticEvent<HTMLElement>, theme: string) {
    if (!event.target.value) {
      return;
    }

    const isLight = theme === 'light';
    const isDark =  !isLight;
    const body = document.body;

    if (body) {
      body.classList.toggle('light-theme', isLight);
      body.classList.toggle('dark-theme', isDark);
    }

    this.setState({ theme });
  }

  renderThemes(themes: Array<string>) {
    return themes.map((theme, i) => (
      <Theme use={theme} key={i}>
        {theme}
      </Theme>
    ));
  }

  renderThemesWithBackground(themes: Array<string>) {
    return themes.map((theme, i) => {
      const background = theme.replace(/text-[^-]*-on-/, '');
      const className = `${background}-theme-bg`;

      return (
        <span className={className} key={i}>
          <Theme use={theme}>
            {theme}
          </Theme>
        </span>
      )
    });
  }

  render() {
    return(
      <Grid className="style-sections">
        <GridCell span="12">
          <section className="style-sections__theme-select border-normal">
            <Radio
              label="Dark Theme"
              value="dark"
              name="themeGroup"
              checked={this.state.theme === 'dark'}
              onChange={event => this.onThemeChanged(event, 'dark')}
            />

            <Radio
              label="Light Theme"
              value="light"
              name="themeGroup"
              checked={this.state.theme === 'light'}
              onChange={event => this.onThemeChanged(event, 'light')}
            />
          </section>
        </GridCell>

        <GridCell span="12">
          <section className="style-sections__themes-text-on-light border-strong">
            <div className="background-color-primary-bg">
              {this.renderThemes([
                 'text-primary-on-light',
                 'text-secondary-on-light',
                 'text-hint-on-light',
                 'text-disabled-on-light',
                 'text-icon-on-light',
                 'status-color-success',
                 'status-color-error',
                 'status-color-warning'
              ])}
            </div>
            <div className="background-color-secondary-bg">
              {this.renderThemes([
                 'text-primary-on-light',
                 'text-secondary-on-light',
                 'text-hint-on-light',
                 'text-disabled-on-light',
                 'text-icon-on-light',
                 'status-color-success',
                 'status-color-error',
                 'status-color-warning'
              ])}
            </div>
          </section>

          <section className="style-sections__themes-on-background">
            {this.renderThemes([
               'primary',
               'primary-light',
               'primary-dark',
               'secondary',
               'secondary-light',
               'secondary-dark',
               'text-primary-on-background',
               'text-secondary-on-background',
               'text-hint-on-background',
               'text-disabled-on-background',
               'text-icon-on-background'
            ])}
          </section>

          <section className="style-sections__themes-bg">
            {this.renderThemes([
               'primary-bg',
               'primary-light-bg',
               'primary-dark-bg',
               'secondary-bg',
               'secondary-light-bg',
               'secondary-dark-bg',
            ])}
          </section>

          <section className="style-sections__themes-text-on-theme-bg">
            {this.renderThemesWithBackground([
               'text-primary-on-primary',
               'text-secondary-on-primary',
               'text-hint-on-primary',
               'text-disabled-on-primary',
               'text-icon-on-primary',

               'text-primary-on-primary-light',
               'text-secondary-on-primary-light',
               'text-hint-on-primary-light',
               'text-disabled-on-primary-light',
               'text-icon-on-primary-light',

               'text-primary-on-primary-dark',
               'text-secondary-on-primary-dark',
               'text-hint-on-primary-dark',
               'text-disabled-on-primary-dark',
               'text-icon-on-primary-dark',

               'text-primary-on-secondary',
               'text-secondary-on-secondary',
               'text-hint-on-secondary',
               'text-disabled-on-secondary',
               'text-icon-on-secondary',

               'text-primary-on-secondary-light',
               'text-secondary-on-secondary-light',
               'text-hint-on-secondary-light',
               'text-disabled-on-secondary-light',
               'text-icon-on-secondary-light',

               'text-primary-on-secondary-dark',
               'text-secondary-on-secondary-dark',
               'text-hint-on-secondary-dark',
               'text-disabled-on-secondary-dark',
               'text-icon-on-secondary-dark'
            ])}
          </section>
        </GridCell>

        <GridCell span="12">
          <section className="style-sections__modals">
            <Button onClick={() => this.setState({ addFeedOpen: true, addFeedLoading: false })}>
              Add Feed
            </Button>
            <Button onClick={() => this.setState({ editFeedOpen: true })}>
              Edit Feed
            </Button>
            <Button onClick={() => this.setState({ deleteFeedOpen: true })}>
              Delete Feed
            </Button>
            <Button onClick={() => this.setState({ editPostOpen: true })}>
              Edit Post
            </Button>

            <DeleteFeedDialog
              open={this.state.deleteFeedOpen}
              title="Tech stories from an Apple developer"
              onCancel={() => this.setState({ deleteFeedOpen: false })}
              onClose={() => this.setState({ deleteFeedOpen: false })}
              onAccept={() => this.setState({ deleteFeedOpen: false })}
            />
            <EditPostDialog
              open={this.state.editPostOpen}
              tags={['web', 'javascript' ]}
              onCancel={() => this.setState({ editPostOpen: false })}
              onClose={() => this.setState({ editPostOpen: false })}
              onAccept={() => this.setState({ editPostOpen: false })}
            />
            <EditFeedDialog
              open={this.state.editFeedOpen}
              title="An innovative web"
              tags={['web', 'javascript', 'web-design', 'performance', 'scalability', 'html', 'emacs', 'vim', 'programming', 'technology', 'usability']}
              onCancel={() => this.setState({ editFeedOpen: false })}
              onClose={() => this.setState({ editFeedOpen: false })}
              onAccept={() => this.setState({ editFeedOpen: false })}
            />
            <AddFeedDialog
              open={this.state.addFeedOpen}
              loading={this.state.addFeedLoading}
              error={this.state.addFeedError}
              onCancel={() => this.setState({ addFeedOpen: false })}
              onClose={() => this.setState({ addFeedOpen: false })}
              onAccept={() => this.onAddFeedAccept()}
            />
          </section>
        </GridCell>

        <GridCell span="6">
          <section className="style-sections__header">
            <h1>Header 1</h1>
            <h2>Header 2</h2>
            <h3>Header 3</h3>
            <h4>Header 4</h4>
            <h5>Header 5</h5>
          </section>
        </GridCell>

        <GridCell span="6">
          <section className="style-sections__typography">
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
        </GridCell>

        <GridCell span="12">
          <section className="style-sections__buttons">
            <Button>Default</Button>

            <Button raised>Raised</Button>
            <Button raised className="icon_warning">
              {icon('pin')}
            </Button>
            <Button raised className="icon_success icon_size-16">
              {icon('pin')} Pin Query
            </Button>

            <Button dense>Dense</Button>
            <Button compact>Compact</Button>
            <Button unelevated>Unelevated</Button>
            <Button stroked>Stroked</Button>
            <Button raised theme={['secondary-bg', 'text-primary-on-secondary']}>With Theme</Button>

            <Fab className="icon_white">{icon('heart')}</Fab>
            <Fab mini>{icon('heart')}</Fab>
            <Fab mini>{icon('dots-vertical')}</Fab>

            <Icon className="icon_success">{icon('heart')}</Icon>
            <Icon className="icon_warning">{icon('heart')}</Icon>
            <Icon className="icon_error">{icon('heart')}</Icon>
            <Icon className="icon_size-32" style={{ background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
              {icon('heart-outline')}
            </Icon>
          </section>
        </GridCell>

        <GridCell>
          <section className="style-sections__cards">
            <Card>
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
        </GridCell>

        <GridCell>
          <section className="style-sections__menus">
            <MenuAnchor>
              <Button onClick={() => this.setState({'menu1IsOpen': !this.state.menu1IsOpen})} >
                <Icon>{icon('dots-vertical')}</Icon>
              </Button>

              <SimpleMenu
                open={this.state.menu1IsOpen}
                onClose={() => this.setState({menu1IsOpen: false})}
              >
                <MenuItem>Cookies</MenuItem>
                <MenuItem>Pizza</MenuItem>
                <MenuItem>Icecream</MenuItem>
              </SimpleMenu>
            </MenuAnchor>
            <MenuAnchor>
              <Button
                raised
                onClick={() => this.setState({'menu2IsOpen': !this.state.menu2IsOpen})}
              >
                Open SimpleMenu
              </Button>

              <SimpleMenu
                open={this.state.menu2IsOpen}
                onClose={() => this.setState({menu2IsOpen: false})}
              >
                <MenuItem>Cookies</MenuItem>
                <MenuItem>Pizza</MenuItem>
                <MenuItem>Icecream</MenuItem>
              </SimpleMenu>
            </MenuAnchor>
          </section>
        </GridCell>

        <GridCell>
          <section className="style-sections__snackbars">
            <Button
              raised
              onClick={() => this.setState({snackbarIsOpen: !this.state.snackbarIsOpen})}
            >
              Show snackbar
            </Button>

            <Snackbar
              show={this.state.snackbarIsOpen}
              onClose={() => this.setState({snackbarIsOpen: false})}
              message="This is a new message"
              actionText="Action"
              actionHandler={() => alert('Action clicked')}
            />

            <Button
              onClick={() => this.setState({snackbarStartIsOpen: !this.state.snackbarStartIsOpen})}
            >
              Show start-aligned
            </Button>

            <Snackbar
              show={this.state.snackbarStartIsOpen}
              onClose={() => this.setState({snackbarStartIsOpen: false})}
              message="Start aligned"
              actionText="Dismiss"
              actionHandler={() => {}}
              alignStart
            />
          </section>
        </GridCell>

        <GridCell>
          <section className="style-sections__drawers">
            <Button
              onClick={() => this.setState({open: !this.state.open})}
              raised
            >
              Toggle Drawer
            </Button>

            <Drawer
              open={this.state.open}
              onClose={() => this.setState({open: false})}
            >
              <DrawerHeader>
                DrawerHeader
              </DrawerHeader>
              <DrawerContent>
                <ListItem>
                  <ListItemText>Cookies</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Pizza</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Icecream</ListItemText>
                </ListItem>
              </DrawerContent>
            </Drawer>
          </section>
        </GridCell>
      </Grid>
    );
  }
}
