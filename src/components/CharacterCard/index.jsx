import React from "react";
import { Card } from "semantic-ui-react";

const CharacterCard = ({ character }) => {
  return (
    <Card
      // className="folk-card"
      fluid
      raised
      // onClick={onCardClick}
    >
      <Card.Content>
        <Card.Header content={character.name} />
        <Card.Meta
          content={`${character.game} placeholder ${
            character.class ? `(${character.class})` : ""
          }`}
        />
        <Card.Description content={character.note} />
      </Card.Content>
    </Card>
  );
};

export default CharacterCard;
