import React, { Component } from 'react';
import { csv } from 'd3';
import chunk from 'lodash/chunk'

import NPC from '../../Data/npc.csv'

import { Pagination } from 'semantic-ui-react'
import FolksList from './FolksList';
import FolksFilters from './FolksFilters';
import FolkModal from './FolkModal';

class Folks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 1,
      NPC: [],
      selectedFolk: null,
      cardsOnPage: 15
    }
    csv(NPC).then(data => {
      let chunkedData = chunk(data, this.state.cardsOnPage)
      this.setState({ NPC: chunkedData })
    })

    this.onPageChange = this.onPageChange.bind(this)
    this.onModalClose = this.onModalClose.bind(this)
    this.onCardClick = this.onCardClick.bind(this)
  }

  onPageChange(event, data) {
    this.setState({ selectedPage: data.activePage })
  }

  onCardClick(event, data) {
    this.setState((state) => ({ selectedFolk: state.NPC[state.selectedPage - 1][data.index] }))
  }

  onModalClose() {
    this.setState({
      selectedFolk: null
    })
  }

  render() {
    let { NPC, selectedPage, selectedFolk } = this.state
    return (
      <div className="folk-section">
        <FolksFilters />
        <FolksList npc={NPC} chunkNumber={selectedPage - 1} onCardClick={this.onCardClick} />
        <Pagination
          defaultActivePage={selectedPage}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={NPC.length - 1}
          onPageChange={this.onPageChange}
        />
        <FolkModal show={!!selectedFolk} folkData={selectedFolk} onModalClose={this.onModalClose} />
      </div>
    );
  }
}

export default Folks;