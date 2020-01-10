import React, { useState } from "react";
import { Form, Modal, Button } from "semantic-ui-react";

import { withFirebase } from "../Firebase";

const CreateCharacterForm = ({ firebase, show, onModalClose }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    game: "",
    class: "",
    notes: "",
    pictureUrl: "",
  });

  const handleInputChange = (e, { id, value }) => {
    // const { id, value } = data;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = () => {
    const newCharKey = firebase.characters().push().key;
    firebase.character(newCharKey).set({
      user: firebase.auth.currentUser.uid,
      pictureUrl: formValues.pictureUrl,
      name: formValues.name,
      class: formValues.class,
      game: formValues.game,
      gear: {
        clothing: "",
        armor: "",
        shield: "",
        weapon: "",
      },
      magicGear: {
        head: "",
        headband: "",
        face: "",
        neck: "",
        shoulders: "",
        chest: "",
        body: "",
        wrists: "",
        hands: "",
        belt: "",
        feet: "",
        ring1: "",
        ring2: "",
        slotless: ""
      },
      inventory: null,
      notes: formValues.notes,
      strength: 10,
      weight: 0,
      wealth: {
        platinum: 0,
        gold: 0,
        silver: 0,
        copper: 0
      }
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
          <Form.Input id="pictureUrl" label="Picture link" onChange={handleInputChange} />
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
