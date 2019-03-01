import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setColors } from '../../store/actions';
import firebase from '../../firebaseSetup';
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Label,
  Icon,
  Segment
} from 'semantic-ui-react';
import { SwatchesPicker } from 'react-color';

class ColorPanel extends Component {
  state = {
    modal: false,
    primary: '9900EF',
    secondary: 'FF6900',
    usersRef: firebase.database().ref('users'),
    userColors: []
  };

  componentDidMount() {
    if (this.props.currentUser) {
      this.addListener(this.props.currentUser.uid);
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  removeListener = () => {
    this.state.usersRef.child(`${this.props.currentUser.uid}/colors`).off();
  };

  addListener = userId => {
    let userColors = [];
    this.state.usersRef.child(`${userId}/colors`).on('child_added', snap => {
      userColors.unshift(snap.val());
      this.setState({ userColors });
    });
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleChangePrimary = color => this.setState({ primary: color.hex });

  handleChangeSecondary = color => this.setState({ secondary: color.hex });

  handleSaveColors = () => {
    if (this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary);
    }
  };

  saveColors = (primary, secondary) => {
    this.state.usersRef
      .child(`${this.props.currentUser.uid}/colors`)
      .push()
      .update({
        primary,
        secondary
      })
      .then(() => {
        this.props.setColors(primary, secondary);
        this.closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  };

  displayUserColors = colors => {
    console.log(colors);
    return (
      colors.length > 0 &&
      colors.map((color, i) => (
        <React.Fragment key={i}>
          <Divider />
          <div
            className='color__container'
            onClick={() => this.props.setColors(color.primary, color.secondary)}
          >
            <div
              className='color__square'
              style={{ background: color.primary }}
            >
              <div
                className='color__overlay'
                style={{ background: color.secondary }}
              />
            </div>
          </div>
        </React.Fragment>
      ))
    );
  };

  render() {
    const { modal, primary, secondary, userColors } = this.state;

    return (
      <Sidebar
        as={Menu}
        icon='labeled'
        inverted
        vertical
        visible
        width='very thin'
      >
        <Divider />
        <Button icon='add' size='small' color='blue' onClick={this.openModal} />
        {this.displayUserColors(userColors)}

        <Modal
          size='tiny'
          basic
          open={modal}
          onClose={this.closeModal}
          id='modal_color-picker'
        >
          <Modal.Header>Choose App Colors</Modal.Header>

          <Modal.Content>
            <Segment inverted>
              <Label content='Primary Color' style={{ marginBottom: '1em' }} />
              <SwatchesPicker
                color={primary}
                onChange={this.handleChangePrimary}
              />
            </Segment>
            <Segment inverted>
              <Label
                content='Secondary Color'
                style={{ marginBottom: '1em' }}
              />
              <SwatchesPicker
                color={secondary}
                onChange={this.handleChangeSecondary}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={this.handleSaveColors}>
              <Icon name='checkmark' /> Save Colors
            </Button>
            <Button color='red' inverted onClick={this.closeModal}>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default connect(
  null,
  { setColors }
)(ColorPanel);
