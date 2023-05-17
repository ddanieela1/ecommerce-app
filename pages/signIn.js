// import React, { useState } from 'react';
// import Typography from '@mui/material/Typography';
import * as React from 'react';
import axios from 'axios';
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
import { useState } from 'react';
import { SettingsSystemDaydreamOutlined } from '@mui/icons-material';

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check user & pass match
    try {
      let { data } = await axios.post('/api/users/signin', {
        headers: {
          'Content-Type': 'application/json',
        },
        email,
        password,
      });
      alert('login successful');
      console.log(response.data);
    } catch (err) {
      // alert(err.message);
      console.log(err);
    }
  };

  // const errorUtils = {
  //   getError: (error) => {
  //     let e = error;
  //     if (error.response) {
  //       e = error.response.data; // data, status, headers
  //       if (error.response.data && error.response.data.error) {
  //         e = error.response.data.error; // my app specific keys override
  //       }
  //     } else if (error.message) {
  //       e = error.message;
  //     } else {
  //       e = 'Unknown error occured';
  //     }
  //     return e;
  //   },
  // };

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
    <form id="submitForm " onClick={handleSubmit}>
      <Paper style={paperStyle} elevation={10} align="center">
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
          {/* --------------email------------ */}
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>

          <OutlinedInput
            placeholder="Enter email"
            id="outlined-adornment-email"
            label="Email"
            edge="start"
            name="email"
            inputprops={{ type: 'email' }}
            onChange={(e) => setEmail(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl
          sx={{
            m: 1,
            width: '25ch',
          }}
          variant="outlined"
        >
          {/* --------------email------------ */}

          {/* --------------passs------------ */}
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            placeholder="Enter password"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            inputprops={{ type: 'password' }}
            endAdornment={
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  onChange={(e) => setPassword(e.target.value)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {/* --------------passs------------ */}

        {/* <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="Remember me"
          labelPlacement="end"
        /> */}
        <div>
          <Button
            // onClick={signinHandler}
            // onClick={handleSubmit}
            color="primary"
            variant="contained"
            fullWidth
            style={bttnStyle}
          >
            Sign In
          </Button>
        </div>

        <Typography>
          Need an an account? &nbsp;
          <Link onClick={registerHandler} href="/register" underline="none">
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </form>
  );
}
