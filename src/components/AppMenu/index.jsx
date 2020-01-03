import React, { Component } from "react";
import { Menu, Image, Button, Dropdown } from "semantic-ui-react";
import SignOutButton from "../SignOut";

import { withRouter } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

class AppMenu extends Component {
  render() {
    return (
      <Menu size="massive" secondary>
        <Menu.Item fitted="vertically">
          <Image size="small" wrapped src="/pathfinder_logo.png" />
        </Menu.Item>
        <Menu.Item
          active={this.props.location.pathname === ROUTES.FOLKS}
          onClick={() => this.props.history.push(ROUTES.FOLKS)}
          content="Folks"
        />
        <Menu.Item
          active={this.props.location.pathname === ROUTES.BESTIARY}
          content="Bestiary"
        />
        <Menu.Item content="Spells" />
        <Menu.Item content="Feats" />
        <Menu.Item position="right">
          {!this.props.authUser ? (
            <Button.Group>
              <Button
                active={this.props.location.pathname === ROUTES.SIGN_IN}
                onClick={() => this.props.history.push(ROUTES.SIGN_IN)}
                content="Sign in"
              />
              <Button
                active={this.props.location.pathname === ROUTES.SIGN_UP}
                onClick={() => this.props.history.push(ROUTES.SIGN_UP)}
                content="Sign up"
              />
            </Button.Group>
          ) : (
            <Dropdown text={this.props.authUser.email} compact>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => this.props.history.push(ROUTES.CHARACTERS)}
                  content="Characters"
                />
                <Dropdown.Item
                  onClick={() => this.props.history.push(ROUTES.GAMES)}
                  content="Games"
                />
                <Dropdown.Item>Favorites</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <SignOutButton />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(AppMenu);
