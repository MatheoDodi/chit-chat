import React, { Component } from 'react';
import firebase from '../../firebaseSetup';
import md5 from 'md5';
import { Link } from 'react-router-dom';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from 'semantic-ui-react';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormEmpty = ({ email, password }) => {
    return email || password;
  };

  isPasswordValid = password => {
    return !(password < 6);
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
          this.setState({ loading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  isFormValid = ({ email, password }) => {
    let errors = [];
    let error;
    console.log(email, password);
    console.log(this.isFormEmpty(email, password));
    if (this.isFormEmpty(email, password)) {
      error = { message: 'Please fill in all fields.' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(password)) {
      error = { message: 'Password not long enough.' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? 'error'
      : '';
  };

  render() {
    const { email, password, errors, loading } = this.state;
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' icon color='violet' textAlign='center'>
            <Icon name='code branch' color='violet' />
            Login to chitChat
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder='Email Address'
                onChange={this.handleChange}
                value={email}
                type='text'
                className={this.handleInputError(errors, 'email')}
              />
              <Form.Input
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                onChange={this.handleChange}
                value={password}
                type='password'
                className={this.handleInputError(errors, 'password')}
              />
              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color='violet'
                fluid
                size='large'
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Don't have an account?{' '}
            <Link style={{ color: '#6435c9' }} to='/register'>
              Register
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
