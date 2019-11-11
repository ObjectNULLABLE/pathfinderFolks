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


    this.onPageChange = this.onPageChange.bind(this)
    this.onModalClose = this.onModalClose.bind(this)
    this.onCardClick = this.onCardClick.bind(this)
    this.onFilter = this.onFilter.bind(this)
  }


  onFilter(event, data) {
    this.setState((state) => ({
      filters: {
        ...state.filters,
        currentPage: 0,
        [data.name]: data.value.toLowerCase()
      }
    }))
  }

  onPageChange(event, data) {
    this.setState({ currentPage: data.activePage - 1 })
  }

  onCardClick(event, data) {
    this.setState((state) => ({
      selectedFolk: state.folksArray[data.index]
    }))
  }

  onModalClose() {
    this.setState({
      selectedFolk: null
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    let { currentPage, folksOnPage, filters } = this.state
    if (
      prevState.currentPage !== currentPage ||
      prevState.filters.name !== filters.name
    ) {

      this.setState({
        folksArray: await db.folks
          .where("searchableName")
          .startsWith(filters.name)
          .offset(currentPage * folksOnPage)
          .limit(folksOnPage)
          .sortBy("cr"),
        folksAmount: await db.folks
          .where("searchableName")
          .startsWith(filters.name)
          .count()
        // folksAmount: result.length / folksOnPage) - 1,
      })
      // db.folks
      //   .filter(folk => (folk.name.includes(filters.name)))
      //   .offset(currentPage * folksOnPage)
      //   .limit(folksOnPage)
      //   .toArray(res => {
      //     this.setState({ folksArray: res })
      //   })
    }
  }

  async componentDidMount() {
    let folksAmount = await db.folks.count()

    folksAmount ? console.info('db already imported') :
      await Papa.parse(folksFile, {
        download: true,
        header: true,
        transformHeader: (header => (camelCase(header))),
        dynamicTyping: true,
        complete: (result) => {
          db.folks.bulkAdd(result.data)
        },
      })

    this.setState({
      folksArray: await db.folks.limit(this.state.folksOnPage).sortBy("cr"),
      folksAmount: folksAmount
    })
  }

  render() {
    let { folksArray, currentPage, selectedFolk, folksOnPage, filters, folksAmount } = this.state
    console.count("rendered: ");
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