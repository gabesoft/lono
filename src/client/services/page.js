

class PageService {
  get login(): string {
    return '/login';
  }

  get home(): string {
    return '/';
  }

  get feeds(): string {
    return '/feeds';
  }

  get posts(): string {
    return '/posts';
  }

  get post(): string {
    return '/post/:postId';
  }

  get styles(): string {
    return '/styles';
  }

  postPath(postId: string): string {
    return `/post/${postId}`;
  }
}

export default new PageService();