import * as React from 'react';

import icon from 'client/Icons';

import Post from 'client/Post';
import Feed from 'client/Feed';
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
  Fab,
  Grid,
  GridCell,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  MenuAnchor,
  Icon,
  PersistentDrawer,
  PersistentDrawerHeader,
  PersistentDrawerContent,
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
  feed2IsSubscribed: boolean
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
      feed2IsSubscribed: true
    };
  }

  renderFeed1() {
    return (
      <Feed
        id="56d7de07c788cb1d6eb91a6d"
        author="Aria Stewart"
        description="Musings about javascript and web technologies"
        lastPostDate="30 minutes ago"
        link="http://aredridel.dinhe.net/"
        postCount={26}
        title="All Confirmation Bias, All The Time"
        unreadCount={4}
        uri="http://aredridel.dinhe.net/atom.xml"
        subscribed={this.state.feed1IsSubscribed}
        onEditClick={() => undefined}
        onOpenFeedClick={() => undefined}
        onOpenRssClick={() => undefined}
        onDeleteClick={() => undefined}
        onSubscribeClick={() => this.setState({ feed1IsSubscribed: !this.state.feed1IsSubscribed })}
      />
    );
  }

  renderFeed2() {
    return (
      <Feed
        id="56d7ddfbc788cb1d6eb919f1"
        description="An Innovative Web - the future, now."
        link="http://aninnovativeweb.tumblr.com/"
        postCount={34}
        title="An Innovative Web"
        uri="http://aninnovativeweb.tumblr.com/rss"
        subscribed={this.state.feed2IsSubscribed}
        onEditClick={() => undefined}
        onOpenFeedClick={() => undefined}
        onOpenRssClick={() => undefined}
        onDeleteClick={() => undefined}
        onSubscribeClick={() => this.setState({ feed2IsSubscribed: !this.state.feed2IsSubscribed })}
      />
    );
  }

  renderPost1() {
    return (
      <Post
        id="5a42092d10906305c8001248-56d7de17c788cb1d6eb91b0c"
        author="Nikola Tore"
        title="Job-hopping makes millennials better hires"
        feedTitle="HackerEarth Blog"
        summary="There is a long history for both hiring managers and recruiters rejecting 'job-hoppers'. Not only in the past but even today a big proportion of employers (43%) support that they would not consider a job-hopper for their open positions. For all those who are not familiar with the term, job-hopping is used to describe employees"
        link="http://blog.hackerearth.com/job-hopping-millennials-hoppers-better-hire"
        date="2017-12-26T08:14:36.000Z"
        isNew={this.state.post1IsNew}
        onOpenClick={() => this.setState({ post1IsNew: !this.state.post1IsNew })}
        onEditTagsClick={() => this.setState({ post1IsNew: !this.state.post1IsNew  })}
      />
    );
  }

  renderPost2() {
    return (
      <Post
        id="5a421b2310906305c80012b4-5814c43709a64c359672dd7a"
        link="https://medium.freecodecamp.org/how-i-built-and-launched-a-chatbot-over-the-weekend-ad8efc522f33?source=rss----336d898217ee---4"
        date="2017-12-26T09:01:36.000Z"
        guid="https://medium.com/p/ad8efc522f33"
        author="Mike Williams"
        title="How I Built And Launched A Chatbot Over The Weekend"
        feedTitle="Free Code Camp - Medium"
        isNew={this.state.post2IsNew}
        onOpenClick={() => this.setState({ post2IsNew: !this.state.post2IsNew })}
        onEditTagsClick={() => this.setState({ post2IsNew: !this.state.post2IsNew })}
      />
    );
  }

  onAddFeedAccept() {
    const loading: boolean = !this.state.addFeedLoading;
    const error = loading ? null : "Failed to add feed!";

    this.setState({
      addFeedLoading: loading,
      addFeedError: error
    });
  }

  render() {
    return(
      <Grid className="style-sections">
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

        <GridCell span="12">
          <section className="style-sections__feed">
            {this.renderFeed1()}
            {this.renderFeed2()}
          </section>
        </GridCell>

        <GridCell span="12">
          <section className="style-sections__post">
            {this.renderPost1()}
            {this.renderPost2()}
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
        </GridCell>

        <GridCell>
          <section className="style-sections__menus">
            <MenuAnchor>
              <Button onClick={() => this.setState({'menu1IsOpen': !this.state.menu1IsOpen})} >
                <Icon>{icon('dots-vertical')}</Icon>
              </Button>

              <Menu
                open={this.state.menu1IsOpen}
                onClose={() => this.setState({menu1IsOpen: false})}
              >
                <MenuItem>Cookies</MenuItem>
                <MenuItem>Pizza</MenuItem>
                <MenuItem>Icecream</MenuItem>
              </Menu>
            </MenuAnchor>
            <MenuAnchor>
              <Button
                raised
                onClick={() => this.setState({'menu2IsOpen': !this.state.menu2IsOpen})}
              >
                Open Menu
              </Button>

              <Menu
                open={this.state.menu2IsOpen}
                onClose={() => this.setState({menu2IsOpen: false})}
              >
                <MenuItem>Cookies</MenuItem>
                <MenuItem>Pizza</MenuItem>
                <MenuItem>Icecream</MenuItem>
              </Menu>
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

        <GridCell span="12">
          <section className="style-sections__themes">
            <div>
              <div style={{ backgroundColor: '#ddd' }}>
                {[
                   'primary',
                   'primary-light',
                   'primary-dark',
                   'secondary',
                   'secondary-light',
                   'secondary-dark',
                   'background',
                   'dark',
                   'primary-bg',
                   'primary-light-bg',
                   'primary-dark-bg',
                   'secondary-bg',
                   'secondary-light-bg',
                   'secondary-dark-bg',
                   'text-primary-on-background',
                   'text-secondary-on-background',
                   'text-hint-on-background',
                   'text-disabled-on-background',
                   'text-icon-on-background',
                   'text-primary-on-light',
                   'text-secondary-on-light',
                   'text-hint-on-light',
                   'text-disabled-on-light',
                   'text-icon-on-light'
                ].map((theme, i) => (
                  <Theme use={theme} key={i}>
                    {theme}
                  </Theme>
                ))}
              </div>
              <div style={{ backgroundColor: '#333' }}>
                {[
                   'text-primary-on-primary',
                   'text-secondary-on-primary',
                   'text-hint-on-primary',
                   'text-disabled-on-primary',
                   'text-icon-on-primary',
                   'text-primary-on-secondary',
                   'text-secondary-on-secondary',
                   'text-hint-on-secondary',
                   'text-disabled-on-secondary',
                   'text-icon-on-secondary',
                   'text-primary-on-dark',
                   'text-secondary-on-dark',
                   'text-hint-on-dark',
                   'text-disabled-on-dark',
                   'text-icon-on-dark'
                ].map((theme, i) => (
                  <Theme use={theme} key={i}>
                    {theme}
                  </Theme>
                ))}
              </div>
            </div>

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

            <PersistentDrawer
              open={this.state.open}
              onClose={() => this.setState({open: false})}
            >
              <PersistentDrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
                PersistentDrawerHeader
              </PersistentDrawerHeader>
              <PersistentDrawerContent>
                <ListItem>
                  <ListItemText>Cookies</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Pizza</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Icecream</ListItemText>
                </ListItem>
              </PersistentDrawerContent>
            </PersistentDrawer>
          </section>
        </GridCell>
      </Grid>
    );
  }
}
