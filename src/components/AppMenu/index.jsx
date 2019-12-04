import React, { Component } from 'react';
import { Menu, Image, Button } from 'semantic-ui-react';
import SignOutButton from '../SignOut';

import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

class AppMenu extends Component {
  render() {
    console.log(this.props.authUser ? this.props.authUser : "not logined");
    return (
      <Menu size="massive" secondary>
        <Menu.Item fitted='vertically' >
          <Image
            size="small"
            wrapped
            src="https://www.firstcomicsnews.com/wp-content/uploads/2016/09/Pathfinder-Logo-600x257.png"
          />
        </Menu.Item>
        <Menu.Item
          active={this.props.location.pathname === ROUTES.FOLKS}
          onClick={() => this.props.history.push(ROUTES.FOLKS)}
        >
          Folks
        </Menu.Item>
        <Menu.Item link>Bestiary</Menu.Item>
        <Menu.Item link>Spells</Menu.Item>
        <Menu.Item link>Feats</Menu.Item>
        <Menu.Item position="right">
          {this.props.authUser && this.props.authUser.email}
          <Button.Group>
            {!this.props.authUser ?
              <>
                <Button
                  active={this.props.location.pathname === ROUTES.SIGN_IN}
                  onClick={() => this.props.history.push(ROUTES.SIGN_IN)}
                >
                  Sign in
                </Button>
                <Button
                  active={this.props.location.pathname === ROUTES.SIGN_UP}
                  onClick={() => this.props.history.push(ROUTES.SIGN_UP)}
                >
                  Sign up
                </Button>
              </> :
              <SignOutButton />
            }
          </Button.Group>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(AppMenu);