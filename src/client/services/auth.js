const CLIENT_ID = '966662239339-nco06tr9j08nfq9krrsmj6jfdlop5185.apps.googleusercontent.com';

import type { AuthInfo } from 'client/types/AuthInfo';

class AuthService {
  init(): Promise<AuthInfo> {
    return this._run(() => new Promise((resolve, reject) => {
      window.gapi.load('client', () => {
        window.gapi.client
          .init({ clientId: CLIENT_ID, scope: 'profile' })
          .then(resolve, reject);
      });
    }));
  }

  signIn(): Promise<AuthInfo> {
    return this._run(() => this._getAuthInstance().signIn());
  }

  signOut(): Promise<AuthInfo> {
    return this._run(() => this._getAuthInstance().signOut());
  }

  refresh(): Promise<AuthInfo> {
    const auth = this._getAuthInstance();
    const user = auth && auth.currentUser.get();
    if (user) {
      return this._run(() => user.reloadAuthResponse());
    } else {
      return this._run(() => Promise.reject(new Error('No logged in user found')));
    }
  }

  _getAuthInstance() {
    return window.gapi && window.gapi.auth2 && window.gapi.auth2.getAuthInstance();
  }

  _getAuthInfo(error?: Error): AuthInfo {
    const auth = this._getAuthInstance();
    const isSignedIn = auth && auth.isSignedIn.get();

    if (!isSignedIn) {
      return {
        isInitialized: !!auth,
        isAuthenticated: false,
        idToken: null,
        userProfile: null,
        error: error || null
      };
    }

    const user = auth.currentUser.get();
    const profile = user.getBasicProfile();

    return {
      isInitialized: true,
      isAuthenticated: true,
      idToken: user.getAuthResponse().id_token,
      error: error || null,
      userProfile: {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        givenName: profile.getGivenName(),
        familyName: profile.getFamilyName(),
        imageUrl: profile.getImageUrl()
      }
    };
  }

  _run(fn: () => Promise<any>): Promise<AuthInfo> {
    return fn().then(
      () => this._getAuthInfo(),
      (err) => this._getAuthInfo(err)
    );
  }
}

export default new AuthService();
