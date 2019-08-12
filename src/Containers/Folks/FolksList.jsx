import React, { PureComponent } from 'react';
import FolkCard from './FolkCard';
import { Grid, Loader, Dimmer } from 'semantic-ui-react';
import slice from 'lodash/slice';

class NPCList extends PureComponent {

  getCurrentPage(allFolks, pageNumber, folksOnPage) {
    return allFolks.length > 0 ?
      slice(allFolks, pageNumber * folksOnPage, pageNumber * folksOnPage + folksOnPage) : []
  }

  filterFolks(folksArray, filters) {
    return folksArray.filter(folk => {
      if (condition) {

      }
      return folk.Name.toLowerCase().includes(data.value.toLowerCase())
    })
  }

  render() {
    let { npc, pageNumber, folksOnPage } = this.props
    let currentPage = this.getCurrentPage(npc, pageNumber, folksOnPage)
    return (
      currentPage.length > 0 ? <Grid className="folk-list" centered padded>
        {
          currentPage.map((folkData, index) => (
            <FolkCard
              key={index}
              folkIndex={index}
              folk={folkData}
              onCardClick={this.props.onCardClick}
            />
          ))
        }
      </Grid > : <Dimmer active inverted><Loader indeterminate size='big' /></Dimmer>
    );
  }
}

export default NPCList;