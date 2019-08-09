import React, { Component } from 'react';
import FolkCard from './FolkCard';
import { Grid } from 'semantic-ui-react';
class NPCList extends Component {
  render() {
    let { npc, chunkNumber } = this.props
    return (
      <Grid columns={4} centered>
        {
          npc.length > 0 && npc[chunkNumber].map((folkData, index) => (
            <FolkCard key={index} folkIndex={index} folk={folkData} onCardClick={this.props.onCardClick} />
          ))
        }
      </Grid >
    );
  }
}

export default NPCList;