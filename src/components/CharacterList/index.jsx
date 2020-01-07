import React, { useState, useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import map from "lodash/map";

import { withFirebase } from "../Firebase";

import CreateCharacterForm from "../CreateCharacterForm";
import CharacterCard from "../CharacterCard";

const CharactersPage = ({ firebase }) => {
  const [characters, setCharacters] = useState({});
  const [showNewCharacterForm, setShowNewCharacterForm] = useState(false);

  useEffect(() => {
    if (firebase.auth.currentUser) {
      firebase
        .characters()
        .orderByChild("user")
        .equalTo(firebase.auth.currentUser.uid)
        .once("value")
        .then(snapshot => setCharacters({ ...snapshot.val() }));
    }
  }, []);

  return (
    <Grid centered padded>
      {map(characters, (character, key) => (
        <Grid.Column key={key} computer={3}>
          <CharacterCard character={character} characterid={key} />
        </Grid.Column>
      ))}

      {showNewCharacterForm ? (
        <CreateCharacterForm />
      ) : (
        <Button
          content="New character"
          onClick={() => setShowNewCharacterForm(true)}
        />
      )}
    </Grid>
  );
};

export default withFirebase(CharactersPage);
