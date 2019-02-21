import React, { Component } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

class UserPanel extends Component {
  render() {
    return (
      <Grid style={{ background: '#4c3c4c' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            <Header inverted floated='left' as='h2'>
              <Icon name='code' />
              <Header.Content>chitChat</Header.Content>
            </Header>
          </Grid.Row>

          <Header style={{ padding: '0.25em' }} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
