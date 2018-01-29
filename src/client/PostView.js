import * as React from 'react';

import AuthorDate from 'client/AuthorDate';
import Avatar from 'client/Avatar';
import BaseComponent from 'client/BaseComponent';

import {
  Grid,
  GridCell
} from 'rmwc';


import type { Feed } from 'client/types/Feed';
import type { UserPost } from 'client/types/Post';

const YOUTUBE_URL = /https?:\/\/www.youtube.com\/watch\?v=(.+)$/;

type Props = {
  userPost: UserPost,
  feed?: Feed
};

export default class PostView extends BaseComponent<Props, {}> {
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
    const post = this.props.userPost.post;
    const src = `https://youtube.com/embed/${path}`;

    return (
      <iframe title={post.title} src={src} allowFullScreen />
    );
  }

  renderDescription() {
    const post = this.props.userPost.post;
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
    const { userPost, feed } = this.props;
    const post = userPost.post;

    return (
      <article className="post-view" role="main">
        <Grid>
          <GridCell className="post-view__header" span="12">
            <div className="post-view__avatar-feed-title">
              <Avatar className="post-view__avatar" text={userPost.title} />
              <a href={feed && feed.link} className="post-view__feed-title">
                {userPost.title}
              </a>
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