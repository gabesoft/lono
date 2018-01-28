import * as React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AuthorDate from 'client/AuthorDate';
import Avatar from 'client/Avatar';

import {
  Grid,
  GridCell
} from 'rmwc';


import type { Match } from 'react-router-dom';
import type { ReduxState } from 'client/types/ReduxState';
import type { UserPost } from 'client/types/Post';

const YOUTUBE_URL = /https?:\/\/www.youtube.com\/watch\?v=(.+)$/;

type ContainerProps = {
  match: Match
};

type UiProps = {
  userPost: ?UserPost,
  userPostId: string
};

type State = {

};

const mapDispatchToProps = () => ({});

const mapStateToProps = (state: ReduxState, props: ContainerProps) => {
  const userPostId = props.match.params.postId;
  const posts = state.posts.items;
  return {
    userPostId,
    userPost: posts.find(p => p._id === userPostId)
  };
};

class PostView extends React.Component<UiProps, State> {
  componentDidMount() {
    window.scrollTo(0, 0);

    const post = this.props.userPost && this.props.userPost.post;
    document.title = (post && post.title) || '';
  }

  processDescription(document: Document) {
    const images = document.getElementsByTagName('img');
    const allElements = document.body && document.body.querySelectorAll('*') || [];

    for (let element of allElements) {
      element.removeAttribute('style');
    }

    for (let img of images) {
      const dataSrc = img.getAttribute('data-src');

      if (dataSrc && !img.hasAttribute('src')) {
        img.src = dataSrc;
      }

      if (img.hasAttribute('src')) {
        img.removeAttribute('srcset');
      }

      img.setAttribute('onerror', 'this.style.display=\'none\';');

      if (!img.hasAttribute('src')) {
        img.setAttribute('style', 'display:none');
      }
    }

    return document;
  }

  renderYoutube(path: string) {
    const post = (this.props.userPost && this.props.userPost.post) || {};
    const src = `https://youtube.com/embed/${path}`;

    return (
      <iframe title={post.title} src={src} allowFullScreen />
    );
  }

  renderDescription() {
    const post = (this.props.userPost && this.props.userPost.post) || {};
    const youtubeMatch = post.link.match(YOUTUBE_URL);

    if (youtubeMatch) {
      return this.renderYoutube(youtubeMatch[1]);
    }

    const descriptionDocument = (new DOMParser).parseFromString(post.description || '', 'text/html');
    const cleanedDocument = this.processDescription(descriptionDocument);
    const html = (new XMLSerializer).serializeToString(cleanedDocument);

    return React.createElement('div', {
      dangerouslySetInnerHTML: { __html: html }
    });
  }

  render() {
    if (!this.props.userPost) {
      return (
        <div>
          A post with id {this.props.userPostId} was not found
        </div>
      );
    }

    const userPost = this.props.userPost;
    const post = userPost.post;

    // TODO make the feed title a link to the feed
    return (
      <article className="post-view" role="main">
        <Grid>
          <GridCell className="post-view__header" span="12">
            <div className="post-view__avatar-feed-title">
              <Avatar className="post-view__avatar" text={userPost.title} />
              <span className="post-view__feed-title">
                {userPost.title}
              </span>
            </div>
            <AuthorDate
              className="post-view__author-date"
              author={post.author}
              date={post.date}
            />
          </GridCell>

          <GridCell className="post-view__title" span="12">
            <a rel="canonical" href={post.link}>
              <h1>{post.title}</h1>
            </a>
          </GridCell>

          <GridCell className="post-view__description" span="12">
            {this.renderDescription()}
          </GridCell>
        </Grid>
      </article>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostView));