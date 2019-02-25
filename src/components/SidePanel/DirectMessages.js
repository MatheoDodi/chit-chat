import React, { Component } from 'react';
import firebase from '../../firebaseSetup';
import { Menu, Icon } from 'semantic-ui-react';

class DirectMessages extends Component {
  state = {
    users: [],
    usersRef: firebase.database().ref('users'),
    connectedRef: firebase.database().ref('.info/connected'),
    presenceRef: firebase.database().ref('presence')
  };

  componentDidMount() {
    if (this.props.currentUser) {
      this.addListeners(this.props.currentUser.uid);
    }
  }

  addListenrs = currentUserUid => {
    let loadedUsers = [];
    this.state.usersRef.on('child_added', snap => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user['uid'] = snap.key;
        user['status'] = 'offline';
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });

    this.state.connectedRef.on('value', snap => {
      if (snap.val() === true) {
        this.state.presenceRef.child(currentUserUid);
        ref.set(true);
        ref.onDisconnect().remove(err => {
          if (err !== null) {
            console.log(err);
          }
        });
      }
    });

    this.state.presenceRef.on('child_added', snap => {
      if (currentUserUid !== snap.key) {
        // add status to user
      }
    });
  };

  render() {
    const { users } = this.state;

    return (
      <Menu.Menu className='menu'>
        <Menu.Item>
          <span>
            <Icon name='mail' /> DIRECT MESSAGES
          </span>{' '}
          ({users.length})
        </Menu.Item>
      </Menu.Menu>
    );
  }
}

export default DirectMessages;
