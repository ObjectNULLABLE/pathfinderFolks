import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import camelCase from 'lodash/camelCase';
import Papa from 'papaparse';

import db from '../../DB/db';
import folksFile from '../../DB/npc.csv';

import { Pagination } from 'semantic-ui-react'
import FolksList from './FolksList';
import FolksFilters from './FolksFilters';
import FolkModal from './FolkModal';

class Folks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 1,
      allFolks: [],
      selectedFolk: null,
      folksOnPage: 10,
      filters: {
        name: null,
        class: null,
        race: null,
        cr: null,
      }
    }

    Papa.parse(folksFile, {
      download: true,
      header: true,
      transformHeader: (header => (camelCase(header))),
      dynamicTyping: true,
      complete: (result) => { 
        this.setState({ allFolks: result.data })
        if (db.folks.count()) {
          db.folks.bulkAdd(result.data).then(lastkey => {console.log(lastkey);})
        }
      },
    })

    this.onPageChange = this.onPageChange.bind(this)
    this.onModalClose = this.onModalClose.bind(this)
    this.onCardClick = this.onCardClick.bind(this)
    this.onFilter = this.onFilter.bind(this)
  }

  onFilter(event, data) {
    this.setState((state) => ({
      filters: {
        ...state.filters,
        [data.name]: data.value
      }
    }))
    // let filteredFolks = this.state.initialFolksArray.filter(folk => {
    //   return folk.Name.toLowerCase().includes(data.value.toLowerCase())
    // })
    // console.log(filteredFolks);
    // this.setState({ allFolks: filteredFolks })
  }

  onPageChange(event, data) {
    this.setState({ selectedPage: data.activePage })
  }

  onCardClick(event, data) {
    this.setState((state) => ({
      selectedFolk: state.allFolks[(state.selectedPage - 1) * state.folksOnPage + data.index]
    }))
  }

  onModalClose() {
    this.setState({
      selectedFolk: null
    })
  }

  render() {
    let { allFolks, selectedPage, selectedFolk, folksOnPage, filters } = this.state
    return (
      <div className="folk-section">
        <FolksFilters onFilter={debounce(this.onFilter, 500)} />
        <FolksList
          npc={allFolks}
          filters={filters}
          pageNumber={selectedPage - 1}
          folksOnPage={folksOnPage}
          onCardClick={this.onCardClick} />
        <Pagination
          defaultActivePage={selectedPage}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={Math.floor(allFolks.length / folksOnPage) - 1}
          onPageChange={this.onPageChange}
        />
        <FolkModal
          show={!!selectedFolk}
          folkData={selectedFolk}
          onModalClose={this.onModalClose}
        />
      </div>
    );
  }
}

export default Folks;