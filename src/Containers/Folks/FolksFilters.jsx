import React, { Component } from 'react';

class FolksFilters extends Component {
  render() {
    return (
      <div className="folks-filters">
        <input placeholder="Name" type="text"/>
        <input placeholder="Class" type="text"/>
        <input placeholder="CR" type="text"/>
        <button>Apply</button>
      </div>
    );
  }
}

export default FolksFilters;