import React from "react";
import { Card } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const CharacterCard = ({ character, characterid, history }) => {
  console.log(character);
  return (
    <Card
      className="base-card"
      fluid
      raised
      onClick={() => history.push(`/character/${characterid}`)}
    >
      <Card.Content>
        <Card.Header content={character.name} />
        <Card.Meta
          content={`${character.game} placeholder ${character.class ? character.class : ""}`}
        />
        <Card.Description content={character.note} />
      </Card.Content>
    </Card>
  );
};

export default withRouter(CharacterCard);
