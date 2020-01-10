import React, { useState, useEffect } from "react";
import { List, Button, Card, Grid, Label, Icon, Header, Image } from 'semantic-ui-react'
import map from "lodash/map";

import NewItemModal from '../NewItemModal'

import { withFirebase } from "../Firebase";

const Character = ({ match, firebase }) => {
  const [character, setCharacter] = useState(null);
  const [showNewItemModal, setShowNewItemModal] = useState(false)

  useEffect(() => {
    firebase
      .character(match.params.characterId)
      .on("value", snapshot => setCharacter({ ...snapshot.val() }))
    return () => {
      firebase
        .character(match.params.characterId)
        .off()
    };
  }, [firebase, match.params.characterId]);

  const createItem = (item) => {
    firebase
      .character(match.params.characterId)
      .child("inventory")
      .push({ ...item })
  }

  return character && (
    <>
      <Grid container>
        <Grid.Column width={12}>

          <Grid>
            <Grid.Column width={6}>
              <Card>
                <Card.Content>
                  <Image src={character.pictureUrl} />
                  <Card.Header>
                    <Header content={character.name} />
                  </Card.Header>
                  <Card.Meta content={character.class} />
                  <Card.Description>
                    <Label>
                      <Icon name="hand rock" /> {"10"}
                    </Label>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={6}>
              <Card>
                <Card.Content>
                  <Card.Header content="Wealth" />
                  <Card.Description>
                    {map(character.wealth, (value, key) => (
                      <div key={key}>{`${key}: ${value}`}</div>
                    ))}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header content="Weight" />
                  <Card.Description>
                    Items:
                    Wealth:
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={6}>
              <Card>
                <Card.Content>
                  <Card.Header content="Gear" />
                  <Card.Description>
                    {map(character.gear, (value, key) => (
                      <div key={key}>{`${key}: ${value}`}</div>
                    ))}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>

        </Grid.Column>
        <Grid.Column width={4}>
          <Card >
            <Card.Content>
              <Card.Header>
                <Header content="Inventory" />
              </Card.Header>
              <Card.Description>
                <List divided size="large">
                  {map(character.inventory, (item, key) => (
                    <List.Item key={key}>
                      <List.Header>
                        {item.name}
                      </List.Header>
                      <List.Content>
                        {item.type}
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Card.Description>
            </Card.Content>
            <Button
              icon="plus" content="New item" onClick={() => setShowNewItemModal(true)} />
          </Card>
        </Grid.Column>
      </Grid>
      <NewItemModal
        show={showNewItemModal}
        onModalClose={() => setShowNewItemModal(false)}
        onModalSubmit={createItem}
      />
    </>
  )

};

export default withFirebase(Character);
