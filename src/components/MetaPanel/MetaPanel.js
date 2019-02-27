import React, { Component } from 'react';
import { Segment, Header, Accordion, Icon } from 'semantic-ui-react';

class MetaPanel extends Component {
  state = {
    activeIndex: 0
  };

  setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Segment style={{ marginRight: '2em' }}>
        <Header as='h3' attached='top'>
          About # Channel
        </Header>
        <Accordion styled attatched='true'>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.setActiveIndex}
          >
            <Icon name='dropdown' />
            <Icon name='info' />
            ChannelDetails
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            Details
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.setActiveIndex}
          >
            <Icon name='dropdown' />
            <Icon name='user circle' />
            Top posters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            posters
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.setActiveIndex}
          >
            <Icon name='dropdown' />
            <Icon name='pencil alternate' />
            ChannelDetails
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            creator
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}

export default MetaPanel;
