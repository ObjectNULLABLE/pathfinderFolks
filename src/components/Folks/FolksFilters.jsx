import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'

class FolksFilters extends Component {
  render() {
    return (
      <div className="folks-filters">
        <Input name="name" placeholder="Name" onChange={this.props.onFilter} />
        <Input name="class" placeholder="Class" onChange={this.props.onFilter} />
        <Input name="race" placeholder="Race" onChange={this.props.onFilter} />
        <Input name="cr" placeholder="CR" onChange={this.props.onFilter} />
      </div>
    );
  }
}

export default FolksFilters;