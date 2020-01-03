import React, { Component } from 'react'
import { Segment, Divider, Grid, Button } from 'semantic-ui-react'

import { withFirebase } from '../Firebase'


class InventoryPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      characters: {}
    }

  }

  createNewCharacter = () => {
    const newCharKey = this.props.firebase.characters().push().key
    console.log(newCharKey)
    this.props.firebase.character(newCharKey).set({
      name: "Ender",
      user: this.props.firebase.auth.currentUser.uid,
      inventory: [],
      gear: []
    })
  }

  createNewGame = () => {

  }

  componentDidMount() {
    this.props.firebase
      .characters()
      .orderByChild('user')
      .equalTo(this.props.firebase.auth.currentUser.uid)
      .once('value')
      .then(snapshot => this.setState({ characters: { ...snapshot.val() } }))
  }

  render() {
    // console.log(this.props.firebase.characters().orderByChild('user').equalTo(this.props.firebase.auth.currentUser.uid))
    return (
      <Segment placeholder raised>
        <Divider content="Or" vertical />
        <Grid columns={2} stackable textAlign='center'>
          <Grid.Column>
            Characters
            {
              Object.values(this.state.characters).map((character, index) =>
                <div key={index} >{character.name}</div>
              )
            }
            <Button
              content="New character"
              onClick={this.createNewCharacter}
            />
          </Grid.Column>
          <Grid.Column>
            Games
            <Button
              content="New game"
              onClick={this.createNewGame}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default withFirebase(InventoryPage)