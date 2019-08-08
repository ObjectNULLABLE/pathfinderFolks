import React, { Component } from 'react';
import './App.css';

import Folks from './Folks';
import Menu from './Menu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <Folks />
      </div>
    );
  }
}

export default App;
