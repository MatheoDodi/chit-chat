import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import DirectMessages from './DirectMessages';
import Channels from './Channels';
import Starred from './Starred';

class SidePanel extends Component {
  render() {
    const { currentUser, primaryColor } = this.props;
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{
          background: primaryColor,
          fontSize: '1.2rem',
          overflowY: 'scroll'
        }}
      >
        <UserPanel currentUser={currentUser} />
        <Starred currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <DirectMessages currentUser={currentUser} />
      </Menu>
    );
  }
}

export default SidePanel;
