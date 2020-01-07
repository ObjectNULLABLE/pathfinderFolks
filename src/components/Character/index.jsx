import React, { useState, useEffect } from "react";

import { withFirebase } from "../Firebase";

const Character = ({ match, firebase }) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    firebase
      .character(match.params.characterId)
      .once("value")
      .then(snapshot => setCharacter({ ...snapshot.val() }));
  }, [firebase, match.params.characterId]);

  return (
    <div>
      {character && (
        <>
          <div>{character.name}</div>
          <div>{character.user}</div>
          <div>{character.game}</div>
          <div>{character.note}</div>
        </>
      )}
    </div>
  );
};

export default withFirebase(Character);
