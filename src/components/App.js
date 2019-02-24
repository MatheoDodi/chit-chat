import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

const App = ({ currentUser, currentChannel }) => (
  <Grid
    columns='equal'
    className='app'
    style={{ background: '#eee', height: '100%' }}
  >
    <ColorPanel />
    <SidePanel currentUser={currentUser} />
    <Grid.Column id='messages-container' style={{ marginLeft: 320 }}>
      {currentChannel ? (
        <Messages currentUser={currentUser} currentChannel={currentChannel} />
      ) : (
        'Loading'
      )}
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
});

export default connect(mapStateToProps)(App);
