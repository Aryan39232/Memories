import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';

import { forgotPassword } from '../../actions/auth';
import useStyles from './styles';
import Input from './input';

const initialState = { email: '', name: '', password: '', confirmPassword: '' };

const ForgotPassword = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(forgotPassword(form, history));
    } catch (_) {
      // Error toast handled by API layer
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="mem-rise">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Reset your password</Typography>
        <Typography variant="body2" className={classes.subtitle}>
          Enter your email and full name to verify your identity, then set a new password.
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input name="email" label="Email address" handleChange={handleChange} type="email" autoFocus />
            <Input name="name" label="Full name" handleChange={handleChange} type="text" />
            <Input name="password" label="New password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={() => setShowPassword(!showPassword)} />
            <Input name="confirmPassword" label="Confirm new password" handleChange={handleChange} type="password" />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading} disableElevation>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset password'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={() => history.push('/auth')}>Back to sign in</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
