import React, { Component } from 'react';

class FolkCard extends Component {
  render() {
    let { folk } = this.props
    return (
      <div className='folk-card'>
        <div>{`Name: ${folk.Name} CR: ${folk.CR} Race: ${folk.Race}`}</div>
        <div>{`Class: ${folk.Class}`}</div>
        <div>{`Skills: ${folk.Skills}`}</div>
      </div>
    );
  }
}

export default FolkCard;