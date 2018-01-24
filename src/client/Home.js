import * as React from 'react';

/* import GoogleLogin from 'react-google-login';
 * */
type State = {

};

type Props = {

};

export default class Home extends React.Component<Props, State> {
  /* onSuccess(response) {
   *   console.log('success', response);
   * }

   * onFailure(response) {
   *   console.log('failure', response);
   * }
   */
  render () {
    /* responseType="code"*/
    /* <GoogleLogin
    clientId="966662239339-nco06tr9j08nfq9krrsmj6jfdlop5185.apps.googleusercontent.com"
    buttonText="Sign in with Google"
    scope="profile"
    fetchBasicProfile={true}
    onSuccess={this.onSuccess.bind(this)}
    onFailure={this.onFailure.bind(this)}
    /> */

    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
}
