import React, { useState } from "react";
import { Form } from "semantic-ui-react";

import { withFirebase } from "../Firebase";

const CreateCharacterForm = ({ firebase }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    game: "",
    class: "",
    notes: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    const newCharKey = firebase.characters().push().key;
    firebase.character(newCharKey).set({
      user: firebase.auth.currentUser.uid,
      name: formValues.name,
      game: formValues.game,
      notes: formValues.notes
    });
  };

  return (
    <Form>
      <Form.Input label="Name" onChange={handleInputChange} />
      <Form.Input label="Game" onChange={handleInputChange} />
      <Form.Input label="Notes" onChange={handleInputChange} />
      <Form.Button content="Submit" onChange={handleSubmit} />
    </Form>
  );
};

export default withFirebase(CreateCharacterForm);
