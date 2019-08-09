import React, { Component } from 'react';
import { Card, GridColumn } from 'semantic-ui-react';

class FolkCard extends Component {
  render() {
    let { folk } = this.props
    return (
      <GridColumn>
        <Card
          index={this.props.folkIndex}
          className="folk-card"
          fluid
          raised
          onClick={this.props.onCardClick}
        >
          <Card.Content>
            <Card.Header content={`${folk.Name} (CR ${folk.CR})`} />
            <Card.Meta content={`${folk.Alignment} ${folk.Race} ${folk.Class ? `(${folk.Class})` : ''}`} />
            <Card.Description>
              <p>{`hp ${folk.HP}; AC ${folk.AC}; CMD ${folk.CMD}`}</p>
              <p>{`Base Atk ${folk.BaseAtk}; Melee ${folk.Melee.length > 120 ? 'see details' : folk.Melee}`}</p>
              <p>{`Fort ${folk.Fort}, Ref ${folk.Ref}, Will ${folk.Will}`}</p>
            </Card.Description>
          </Card.Content>
        </Card>
      </GridColumn>
    );
  }
}

export default FolkCard;