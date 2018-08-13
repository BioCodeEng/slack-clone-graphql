import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Container, FormContainer, FormControlStyled } from './styles';

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: '',
      password: '',
      showPassword: false,
      errors: {},
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  }

  onSubmit = async () => {
    this.errors = {};
    const { email, password } = this;
    const { mutate, history } = this.props;
    const response = await mutate({ variables: { email, password } });
    const {
      ok, token, refreshToken, errors,
    } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
    console.log('====================================');
    console.log(response, this.errors);
    console.log('====================================');
  }

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  render() {
    const {
      email, password, showPassword, errors: { emailError, passwordError },
    } = this;
    return (
      <Container>
        <FormContainer>
          <Typography variant="headline">
            Login
          </Typography>

          <FormControlStyled error={!!emailError}>
            <InputLabel htmlFor="email">
              Email
            </InputLabel>
            <Input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={this.onChange}
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
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.onChange}
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
            onClick={this.onSubmit}
          >
            Login
          </Button>
        </FormContainer>
      </Container>
    );
  }
}

export default graphql(loginMutation)(observer(Login));
