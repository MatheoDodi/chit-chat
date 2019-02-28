import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import { connect } from 'react-redux';

const App = ({
  currentUser,
  currentChannel,
  isPrivateChannel,
  userPosts,
  primaryColor,
  secondaryColor
}) => (
  <Grid
    columns='equal'
    className='app'
    style={{ background: secondaryColor, height: '100%' }}
  >
    <ColorPanel
      key={currentUser && currentUser.name}
      currentUser={currentUser}
    />
    {currentUser ? (
      <SidePanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
        primaryColor={primaryColor}
      />
    ) : (
      'Loading'
    )}
    <Grid.Column style={{ marginLeft: 350 }} id='messages-container'>
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
        userPosts={userPosts}
      />
    </Grid.Column>
  </Grid>
);

const MapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor
});

export default connect(MapStateToProps)(App);
