import React, { useContext, useEffect, useState } from 'react';
import { Typography, Box, TextField, Paper, Grid, Button } from '@mui/material';
import Cookie from 'js-cookie'
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';

export default function Register() {
  const router = userRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const userInfo = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
      alert('Password does not match. Try again')
      return;
    }
    try{
      const {data} =  await axios.post('/api/users/register'),{
        name,
        email,
        password,
  

      }
      dispatch({ type: USER_REGISTER, payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');

      console.log(data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Invalid email or password. Please try again.');
      } else {
        alert(err.message);
      }
    }

  const paperStyle = {
    padding: 2,
    width: 400,
    margin: '0 auto',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper sx={paperStyle}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              Register
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ width: '100%' }}>
            <TextField label="First Name" variant="filled" />
          </Grid>

          <Grid item xs={6} sx={{ width: '100%' }}>
            <TextField variant="filled" label="Last Name" />
          </Grid>

          <Grid item xs={6}>
            <TextField
              align="center"
              variant="filled"
              label="Password"
              type="password"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              align="center"
              variant="filled"
              label="Re-type Password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              align="center"
              variant="filled"
              id="outlined-email"
              label="Email"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
