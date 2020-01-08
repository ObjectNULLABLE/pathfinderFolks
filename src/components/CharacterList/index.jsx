import React, { useState, useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import map from "lodash/map";

import { withFirebase } from "../Firebase";

import CreateCharacterModal from "../CreateCharacterModal";
import CharacterCard from "../CharacterCard";

const CharactersPage = ({ firebase }) => {
  const [characters, setCharacters] = useState({});
  const [showCreateCharacterModal, setShowCreateCharacterModal] = useState(false)

  useEffect(() => {
    if (firebase.auth.currentUser) {
      firebase
        .characters()
        .orderByChild("user")
        .equalTo(firebase.auth.currentUser.uid)
        .once("value")
        .then(snapshot => setCharacters({ ...snapshot.val() }));
    }
  }, [firebase, firebase.auth.currentUser]);

  return (
    <Grid centered padded>
      {
        map(characters, (character, key) => (
          <Grid.Column key={key} computer={3}>
            <CharacterCard character={character} characterid={key} />
          </Grid.Column>
        ))
      }
      <Grid.Column computer={3} stretched>
        <Button
          fluid
          content="New character"
          onClick={() => setShowCreateCharacterModal(true)}
        />
      </Grid.Column>
      <CreateCharacterModal
        show={showCreateCharacterModal}
        onModalClose={() => setShowCreateCharacterModal(false)}
      />
    </Grid>
  );
};

export default withFirebase(CharactersPage);
