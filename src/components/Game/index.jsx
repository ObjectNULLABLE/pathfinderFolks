import React, { Component } from 'react'
import { Segment, Divider, Grid, Button } from 'semantic-ui-react'

import {withFirebase} from '../Firebase'


class InventoryPage extends Component {
  // constructor(props){
  //   super(props)

  // }

  createNewCharacter = () => {
    const newCharKey = this.props.firebase.characters().push().key
    // const test = this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child(`characters/${newCharRef}`)
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

  render() {
    console.log(this.props.firebase.characters().orderByChild('user').toString())
    return (
      <Segment placeholder raised>
        <Divider content="Or" vertical />
        <Grid columns={2} stackable textAlign='center'>
          <Grid.Column>
            Characters
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