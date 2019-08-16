import React, { PureComponent } from 'react';
import debounce from 'lodash/debounce';
import camelCase from 'lodash/camelCase';
import Papa from 'papaparse';

import db from '../../DB/db';
import folksFile from '../../DB/npc.csv';

import { Pagination } from 'semantic-ui-react'
import FolksList from './FolksList';
import FolksFilters from './FolksFilters';
import FolkModal from './FolkModal';

class Folks extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      folksOnPage: 15,
      folksAmount: 0,
      folksArray: [],
      selectedFolk: null,
      filters: {
        name: "",
        class: "",
        race: "",
        cr: "",
      }
    }

    db.folks.count().then(amount => {
      this.setState({ folksAmount: amount })
      amount ?
        console.info('db already imported') :
        Papa.parse(folksFile, {
          download: true,
          header: true,
          transformHeader: (header => (camelCase(header))),
          dynamicTyping: true,
          complete: (result) => {
            db.folks.bulkAdd(result.data)
          },
        })
    })

    db.folks.orderBy("cr").limit(this.state.folksOnPage).toArray(res => {
      this.setState({ folksArray: res })
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
        [data.name]: data.value.toLowerCase()
      }
    }))
  }

  onPageChange(event, data) {
    this.setState({ currentPage: data.activePage - 1 })
  }

  onCardClick(event, data) {
    this.setState((state) => ({
      selectedFolk: state.folksArray[state.currentPage * state.folksOnPage + data.index]
    }))
  }

  onModalClose() {
    this.setState({
      selectedFolk: null
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    let { currentPage, folksOnPage, filters } = this.state
    let result
    if (
      prevState.currentPage !== currentPage ||
      prevState.filters.name !== filters.name
    ) {
      result =
        await db.folks
          .where("searchableName")
          .startsWithIgnoreCase(filters.name)
          .reverse()
          .offset(currentPage * folksOnPage)
          .limit(folksOnPage)
          .sortBy("cr")
      this.setState({ folksArray: result })
      // db.folks
      //   .filter(folk => (folk.name.includes(filters.name)))
      //   .offset(currentPage * folksOnPage)
      //   .limit(folksOnPage)
      //   .toArray(res => {
      //     this.setState({ folksArray: res })
      //   })
    }
  }

  render() {
    let { folksArray, currentPage, selectedFolk, folksOnPage, filters, folksAmount } = this.state
    console.log("rndr");
    return (
      <div className="folk-section">
        <FolksFilters onFilter={debounce(this.onFilter, 500)} />
        <FolksList
          npc={folksArray}
          filters={filters}
          pageNumber={currentPage}
          folksOnPage={folksOnPage}
          onCardClick={this.onCardClick} />
        <Pagination
          defaultActivePage={currentPage + 1}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={Math.floor(folksAmount / folksOnPage) - 1}
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