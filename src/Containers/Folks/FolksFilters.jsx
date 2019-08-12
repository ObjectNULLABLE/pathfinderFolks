import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react'

class FolksFilters extends Component {
  render() {
    return (
      <div className="folks-filters">
        <Input name="name" placeholder="Name" onChange={this.props.onFilter} />
        <Input name="class" placeholder="Class" onChange={this.props.onFilter} />
        <Input name="race" placeholder="Race" onChange={this.props.onFilter} />
        <Input name="cr" placeholder="CR" onChange={this.props.onFilter} />
        <Button>Apply</Button>
      </div>
    );
  }
}

export default FolksFilters;