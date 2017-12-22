import React, { Component } from 'react';

import Header from 'client/Header';

export default class App extends Component<{||}> {
  render() {
    return(
      <div className="app">
        <Header />
      </div>
    );
  }
}