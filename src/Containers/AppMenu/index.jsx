import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';

class AppMenu extends Component {
  render() {
    return (
      <Menu size="massive" secondary>
        <Menu.Item fitted='vertically' >
          <Image
            size="small"
            wrapped
            src="https://www.firstcomicsnews.com/wp-content/uploads/2016/09/Pathfinder-Logo-600x257.png"
          />
        </Menu.Item>
        <Menu.Item link active={true} >Folks</Menu.Item>
        <Menu.Item link>Bestiary</Menu.Item>
        <Menu.Item link>Spells</Menu.Item>
        <Menu.Item link>Feats</Menu.Item>
      </Menu>
    );
  }
}

export default AppMenu;