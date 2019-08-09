import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react'

class FolksFilters extends Component {
  render() {
    return (
      <div className="folks-filters">
        <Input placeholder="Name" type="text" />
        <Input placeholder="Class" type="text" />
        <Input placeholder="Race" type="text" />
        <Input placeholder="CR" type="text" />
        <Button>Apply</Button>
      </div>
    );
  }
}

export default FolksFilters;