const CLIENT_ID = '966662239339-nco06tr9j08nfq9krrsmj6jfdlop5185.apps.googleusercontent.com';

import EventEmitter from 'wolfy87-eventemitter';

type ProfileData = {
  id: string,
  name: string,
  email: string,
  givenName: string,
  familyName: string,
  imageUrl: string
};

class AuthService extends EventEmitter {
  _isSignedIn: boolean
  _user: ?Object
  _profile: ?Object
  _profileData: ?ProfileData
  _idToken: ?string

  get isSignedIn(): boolean {
    return this._isSignedIn;
  }

  get profileName(): ?string {
    return this._getProfileData('name');
  }

  get profileEmail(): ?string {
    return this._getProfileData('email');
  }

  get profileGivenName(): ?string {
    return this._getProfileData('givenName');
  }

  constructor() {
    super();
    this._clear();
  }

  _getProfileData(name: string): ?string {
    return this._profileData && this._profileData[name];
  }

  _log(data: Object) {
    // eslint-disable-next-line no-console
    console.log(data);
  }

  _clear() {
    this._isSignedIn = false;
    this._user = null;
    this._profile = null;
    this._profileData = null;
    this._idToken = null;
  }

  _init() {
    const auth = this.getAuthInstance();
    this._isSignedIn = auth && auth.isSignedIn.get();

    if (this._isSignedIn) {
      const user = auth.currentUser.get();
      const profile = user.getBasicProfile();

      this._user = user;
      this._profile = profile;
      this._idToken = user.getAuthResponse().id_token;
      this._profileData = {
        id: profile.getId(),
        email: profile.getEmail(),
        name: profile.getName(),
        givenName: profile.getGivenName(),
        familyName: profile.getFamilyName(),
        imageUrl: profile.getImageUrl()
      }
    }
  }

  onInitSuccess() {
    this._init();
    this.emitEvent('init-success');
  }

  onSignInSuccess() {
    this._init();
    this.emitEvent('signin-success');
  }

  onSignOutSuccess() {
    this._clear();
    this.emitEvent('signout-success');
  }

  onRefreshSuccess() {
    this._init();
    this.emitEvent('refresh-success');
  }

  onSignInFailure(reason: Object) {
    this._log(reason);
    this._clear();
    this.emitEvent('signin-failure');
  }

  onInitFailure(reason: Object) {
    this._log(reason);
    this._clear();
    this.emitEvent('init-failure');
  }

  onSignOutFailure(reason: Object) {
    this._log(reason);
    this._clear();
    this.emitEvent('signout-failure');
  }

  onRefreshFailure(reason: Object) {
    this._log(reason);
    this._clear();
    this.emitEvent('refresh-failure');
  }

  refresh() {
    if (this._user) {
      this._user
        .reloadAuthResponse()
        .then(this.onRefreshSuccess.bind(this), this.onRefreshFailure.bind(this));
    }
  }

  signIn() {
    this.getAuthInstance()
      .signIn()
      .then(this.onSignInSuccess.bind(this), this.onSignInFailure.bind(this));
  }

  signOut() {
    this.getAuthInstance()
      .signOut()
      .then(this.onSignOutSuccess.bind(this), this.onSignOutFailure.bind(this));
  }

  getAuthInstance() {
    return window.gapi && window.gapi.auth2 && window.gapi.auth2.getAuthInstance();
  }

  onStart() {
    window.gapi.client
      .init({ clientId: CLIENT_ID, scope: 'profile' })
      .then(this.onInitSuccess.bind(this), this.onInitFailure.bind(this));
  }

  init() {
    if (this.getAuthInstance()) {
      this.onInitSuccess();
    } else {
      window.gapi.load('client', this.onStart.bind(this));
    }
  }
}

export default new AuthService();
