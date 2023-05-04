// import React, { useState } from 'react';
// import Typography from '@mui/material/Typography';
import * as React from 'react';
import {
  Card,
  // Grid,
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputLabel,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockPersonTwoToneIcon from '@mui/icons-material/LockPersonTwoTone';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registerHandler = () => {
    const router = useRouter();
    router.push('/register');
  };

  const signinHandler = () => {
    router.push('/');
  };

  const paperStyle = {
    padding: 20,
    height: '60vh',
    width: 300,
    margin: '80px auto',
  };

  const bttnStyle = {
    margin: '10px 0',
  };

  return (
    <Paper style={paperStyle} elevation={10} align="center">
      {/* <Card align="center"> */}
      <LockPersonTwoToneIcon />
      <div>
        <Typography component="h1" variant="h3">
          Sign in
        </Typography>
      </div>

      <FormControl
        sx={{
          m: 1,
          width: '15ch',
        }}
        variant="outlined"
      ></FormControl>

      <FormControl
        sx={{
          m: 1,
          width: '25ch',
        }}
      >
        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>

        <OutlinedInput
          placeholder="Enter username"
          id="outlined-adornment-username"
          label="Username"
          edge="start"
        ></OutlinedInput>
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          width: '25ch',
        }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          placeholder="Enter password"
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormControlLabel
        value="end"
        control={<Checkbox />}
        label="Remember me"
        labelPlacement="end"
      />
      <div>
        <Button
          onClick={signinHandler}
          color="primary"
          variant="contained"
          fullWidth
          style={bttnStyle}
        >
          Sign In
        </Button>
      </div>
      {/* </Card> */}
      <Typography>
        Need an an account? &nbsp;
        <Link onClick={registerHandler} href="/register" underline="none">
          Sign Up
        </Link>
      </Typography>
    </Paper>
  );
}
