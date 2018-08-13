import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { Container, FormContainer, FormControlStyled } from './styles';

const registerUser = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

class Register extends Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    showPassword: false,
  };

  onSubmit = mutate => async () => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    });
    const { username, email, password } = this.state;
    const { history } = this.props;
    const response = await mutate({
      variables: { username, email, password },
    });

    const { ok, errors } = response.data.register;
    if (ok) {
      history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  };

  handleChange = prop => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const {
      username,
      usernameError,
      email,
      emailError,
      password,
      passwordError,
      showPassword,
    } = this.state;

    return (
      <Mutation mutation={registerUser}>
        {mutate => (
          <Container>
            <FormContainer>
              <Typography variant="headline">
                Register
              </Typography>
              <FormControlStyled error={!!usernameError}>
                <InputLabel htmlFor="username">
                  Username
                </InputLabel>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={this.handleChange('username')}
                  fullWidth
                />
                {!!usernameError && (
                  <FormHelperText id="name-error-text">
                    {usernameError}
                  </FormHelperText>
                )}
              </FormControlStyled>
              <FormControlStyled error={!!emailError}>
                <InputLabel htmlFor="email">
                  Email
                </InputLabel>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={this.handleChange('email')}
                  fullWidth
                />
                {!!emailError && (
                  <FormHelperText id="name-error-text">
                    {emailError}
                  </FormHelperText>
                )}
              </FormControlStyled>
              <FormControlStyled error={!!passwordError}>
                <InputLabel htmlFor="adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={this.handleChange('password')}
                  fullWidth
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )}
                />
                {!!passwordError && (
                  <FormHelperText id="name-error-text">
                    {passwordError}
                  </FormHelperText>
                )}
              </FormControlStyled>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={this.onSubmit(mutate)}
              >
                Register
              </Button>
            </FormContainer>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default Register;
