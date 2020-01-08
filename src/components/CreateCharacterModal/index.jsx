import React, { useState } from "react";
import { Form, Modal, Button } from "semantic-ui-react";

import { withFirebase } from "../Firebase";

const CreateCharacterForm = ({ firebase, show, onModalClose }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    game: "",
    class: "",
    notes: ""
  });

  const handleInputChange = (e, { id, value }) => {
    // const { id, value } = data;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = () => {
    const newCharKey = firebase.characters().push().key;
    firebase.character(newCharKey).set({
      user: firebase.auth.currentUser.uid,
      name: formValues.name,
      class: formValues.class,
      game: formValues.game,
      notes: formValues.notes
    });
  };

  return (
    <Modal
      open={show}
      onClose={onModalClose}
      dimmer="inverted"
      basic
    // size="small"
    >
      <Modal.Header content="New character form" />
      <Modal.Content>
        <Form >
          <Form.Input id="name" label="Name" onChange={handleInputChange} />
          <Form.Input id="class" label="Class" onChange={handleInputChange} />
          {/* <Form.Input id="game" label="Game" onChange={handleInputChange} /> */}
          <Form.Input id="notes" label="Notes" onChange={handleInputChange} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Create" onClick={handleSubmit} />
      </Modal.Actions>
    </Modal>
  );
};

export default withFirebase(CreateCharacterForm);
