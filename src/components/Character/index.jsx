import React, { useState, useEffect } from "react";
import { List, Button, Card, Grid, Label, Icon } from 'semantic-ui-react'
import map from "lodash/map";

import { withFirebase } from "../Firebase";

const Character = ({ match, firebase }) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    firebase
      .character(match.params.characterId)
      .once("value")
      .then(snapshot => setCharacter({ ...snapshot.val() }));
  }, [firebase, match.params.characterId]);

  return character && (
    <Grid container>
      <Grid.Row stretched>
        <Grid.Column width={12}>
          <Grid>
            <Grid.Column width={6}>
              <Card>
                <Card.Content>
                  <Card.Header content={character.name} />
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
                    Gold: 99999
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header content="Weight" />
                  <Card.Description>
                    Items: 9
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
                Inventory
              </Card.Header>
              <Card.Description>
                <List divided size="large">
                  {map(character.inventory, (item, key) => (
                    <List.Item>
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
            <Button icon="plus" content="New item" />
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

};

export default withFirebase(Character);
