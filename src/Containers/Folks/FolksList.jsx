import React, { Component } from 'react';
import FolkCard from './FolkCard';
class NPCList extends Component {
  render() {
    let { npc, chunkNumber } = this.props
    return (
      <div className='folk-section'>
        {npc.length > 0 &&
          <div className='folk-list'>
            {
              npc[chunkNumber].map((npcChunk, index) => (
                <FolkCard key={index} folk={npcChunk} />
              ))
            }
          </div>
        }
      </div>
    );
  }
}

export default NPCList;