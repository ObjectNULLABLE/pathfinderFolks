import React, { useState } from 'react'
import { Modal, Form, Button } from 'semantic-ui-react'

import { itemTypes } from '../../constants/game'

const NewItemModal = ({ show, onModalClose, onModalSubmit }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    type: "",
    price: 0,
    weight: 0,
    amount: 1,
  })

  const handleInputChange = (e, { id, value }) => setFormValues({ ...formValues, [id]: value })

  return (
    <Modal open={show} onClose={onModalClose} dimmer="inverted" size="tiny">
      <Modal.Header>
        Create new item
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form >
            <Form.Group>
              <Form.Input label="Name" id="name" placeholder="Name" onChange={handleInputChange} />
              <Form.Select label="Type" id="type" placeholder="Type" onChange={handleInputChange} options={itemTypes} />
            </Form.Group>
            <Form.Group widths="2" >
              <Form.Input label="Price" id="price" placeholder={0} onChange={handleInputChange} />
              <Form.Input label="Weight" id="weight" placeholder={0} onChange={handleInputChange} />
              <Form.Input label="Amount" id="amount" placeholder={1} onChange={handleInputChange} />
            </Form.Group>
            <Form.Input label="Link" />
            <Form.TextArea label="Description" />

            <Form.Button content="Create" onClick={() => {
              onModalSubmit(formValues)
              onModalClose()
            }
            } />
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default NewItemModal
