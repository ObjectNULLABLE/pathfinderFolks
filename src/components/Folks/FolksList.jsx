import React, { PureComponent } from "react";
import FolkCard from "./FolkCard";
import { Grid, Loader } from "semantic-ui-react";

class NPCList extends PureComponent {
  filterFolks(folksArray, filters) {
    // return folksArray.filter(folk => {
    //   if (condition) {
    //   }
    //   return folk.Name.toLowerCase().includes(data.value.toLowerCase())
    // })
  }

  render() {
    let { npc } = this.props;
    return npc.length > 0 ? (
      <Grid className="folk-list" centered padded>
        {npc.map((folkData, index) => (
          <FolkCard
            key={index}
            folkIndex={index}
            folk={folkData}
            onCardClick={this.props.onCardClick}
          />
        ))}
      </Grid>
    ) : (
      <Loader active indeterminate inline size="big" />
    );
  }
}

export default NPCList;
