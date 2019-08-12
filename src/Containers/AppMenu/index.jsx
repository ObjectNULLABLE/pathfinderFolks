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
        <Menu.Item active={true} >Folks</Menu.Item>
        <Menu.Item>Spells</Menu.Item>
        <Menu.Item>Feats</Menu.Item>
      </Menu>
    );
  }
}

export default AppMenu;