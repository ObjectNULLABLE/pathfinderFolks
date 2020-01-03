import React, { useState, useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";

import { withFirebase } from "../Firebase";

import CreateCharacterForm from "../CreateCharacterForm";
import CharacterCard from "../CharacterCard";

const InventoryPage = ({ firebase }) => {
  const [characters, setCharacters] = useState({});
  const [showNewCharacterForm, setShowNewCharacterForm] = useState(false);

  useEffect(() => {
    firebase
      .characters()
      .orderByChild("user")
      .equalTo(firebase.auth.currentUser.uid)
      .once("value")
      .then(snapshot => setCharacters({ ...snapshot.val() }));
  }, [firebase]);

  return (
    <Grid centered padded>
      {Object.values(characters).map((character, index) => (
        <Grid.Column key={index} computer={3}>
          <CharacterCard character={character} />
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

export default withFirebase(InventoryPage);
