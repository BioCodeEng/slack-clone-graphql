import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
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

class Login extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: '',
      password: '',
      showPassword: false
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  }

  onSubmit = () => {
    console.log(this);
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.showPassword = !this.showPassword
  };

  render() {
    const { email, password, showPassword } = this;
    return (
      <Container>
        <FormContainer>
          <Typography variant="headline">Login</Typography>

          <FormControlStyled>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={this.onChange}
              fullWidth
            />
          </FormControlStyled>
          <FormControlStyled>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.onChange}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
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

export default observer(Login);
