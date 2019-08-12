import React, { Component } from 'react';
import './App.css';

import Folks from './Folks';
import AppMenu from './AppMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppMenu />
        <Folks />
      </div>
    );
  }
}

export default App;
