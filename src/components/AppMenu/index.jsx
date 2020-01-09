import React from "react";
import { Menu, Image, Button, Dropdown } from "semantic-ui-react";
import SignOutButton from "../SignOut";

import { withRouter } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

export const AppMenu = ({ location, history, authUser }) => {
  return (
    <Menu size="massive" secondary stackable>
      <Menu.Item header fitted="vertically">
        <Image size="small" wrapped src="/pathfinder_logo.png" />
      </Menu.Item>
      <Menu.Item
        active={location.pathname === ROUTES.FOLKS}
        onClick={() => history.push(ROUTES.FOLKS)}
        content="Folks"
      />
      <Menu.Item
        active={location.pathname === ROUTES.BESTIARY}
        content="Bestiary"
      />
      <Menu.Item content="Spells" />
      <Menu.Item content="Feats" />
      <Menu.Item position="right">
        {!authUser ? (
          <Button.Group>
            <Button
              active={location.pathname === ROUTES.SIGN_IN}
              onClick={() => history.push(ROUTES.SIGN_IN)}
              content="Sign in"
            />
            <Button
              active={location.pathname === ROUTES.SIGN_UP}
              onClick={() => history.push(ROUTES.SIGN_UP)}
              content="Sign up"
            />
          </Button.Group>
        ) : (
            <Dropdown text={authUser.email} compact>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => history.push(ROUTES.CHARACTERS)}
                  content="Characters"
                />
                <Dropdown.Item
                  onClick={() => history.push(ROUTES.GAMES)}
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
};

export default withRouter(AppMenu);
