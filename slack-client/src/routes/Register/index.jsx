import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Container, FormContainer, FormControlStyled } from './styles';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const registerUser = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    register(
      username: $username,
      email: $email,
      password: $password
    )
  }
`;

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    showPassword: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  onSubmit = mutate => async event => {
    const { username, email, password } = this.state;
    const response = await mutate({
      variables: {username, email, password}
    });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { username, email, password, showPassword} = this.state;
    return (
      <Mutation mutation={registerUser}>
      {(mutate, data) => {
        return (
          <Container>
          <FormContainer>
            <Typography variant="headline">Register</Typography>
            <FormControlStyled>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={this.handleChange("username")}
                fullWidth
              />
            </FormControlStyled>
            <FormControlStyled>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={this.handleChange("email")}
                fullWidth
              />
            </FormControlStyled>
            <FormControlStyled>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={this.handleChange("password")}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControlStyled>
            <Button variant="contained" color="secondary" fullWidth onClick={this.onSubmit(mutate)}>
              Register
            </Button>
          </FormContainer>
        </Container>
        )
      }}
      </Mutation>

    );
  }
}

export default Register;
