import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import { connect } from 'react-redux';

const App = ({ currentUser, currentChannel, isPrivateChannel }) => (
  <Grid
    columns="equal"
    className="app"
    style={{ background: '#eee', height: '100%' }}
  >
    <ColorPanel
      key={currentUser && currentUser.name}
      currentUser={currentUser}
    />
    {currentUser ? (
      <SidePanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
      />
    ) : (
      'Loading'
    )}
    <Grid.Column style={{ marginLeft: 320 }} id="messages-container">
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
        isPrivateChannel={isPrivateChannel}
      />
    </Grid.Column>
    <Grid.Column width={4}>
      <MetaPanel
        currentChannel={currentChannel}
        key={currentChannel && currentChannel.name}
        isPrivateChannel={isPrivateChannel}
      />
    </Grid.Column>
  </Grid>
);

const MapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel
});

export default connect(MapStateToProps)(App);
