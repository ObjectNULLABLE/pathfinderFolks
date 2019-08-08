import React, { Component } from 'react';
import { csv } from 'd3';
import _ from 'lodash'

import NPC from '../../Data/npc.csv'

import FolksList from './FolksList';
import FolksFilters from './FolksFilters';

class Folks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NPC: []
    }
    csv(NPC).then(data => {
      let chunkedData = _.chunk(data, 12)
      this.setState({ NPC: chunkedData })
    })
  }

  render() {
    return (
      <div className="folk-section">
        <FolksFilters />
        <FolksList npc={this.state.NPC} chunkNumber={0} />
      </div>
    );
  }
}

export default Folks;