import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import { notify } from '../../utils/feedback';
import useStyles from './styles';
import Input from './input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const googleConfigured = !!process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        await dispatch(signup(form, history));
      } else {
        await dispatch(signin(form, history));
      }
    } catch (error) {
      // Error toast is handled globally by the API layer.
    } finally {
      setLoading(false);
    }
  };

  const googleSuccess = (credentialResponse) => {
    try {
      const credential = credentialResponse?.credential;
      const decoded = jwtDecode(credential); // { name, email, picture, sub, ... }
      const result = {
        _id: decoded.sub,
        googleId: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        imageUrl: decoded.picture,
      };
      dispatch({ type: AUTH, data: { result, token: credential } });
      notify(`Welcome${result.name ? `, ${result.name.split(' ')[0]}` : ''}.`, 'success');
      history.push('/');
    } catch (error) {
      notify('Google sign-in failed. Please try again.', 'error');
    }
  };

  const googleError = () => notify('Google sign-in was cancelled or failed.', 'error');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs" className="mem-rise">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Create your account' : 'Welcome back'}</Typography>
        <Typography variant="body2" className={classes.subtitle}>
          {isSignup ? 'Start collecting the moments that matter.' : 'Sign in to pick up where you left off.'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat password" handleChange={handleChange} type="password" />}
          </Grid>
          {!isSignup && (
            <Grid container justify="flex-end">
              <Grid item>
                <Button size="small" onClick={() => history.push('/forgot-password')} style={{ textTransform: 'none', marginTop: 4 }}>
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
          )}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading} disableElevation>
            {loading ? <CircularProgress size={24} color="inherit" /> : (isSignup ? 'Sign up' : 'Sign in')}
          </Button>

          {googleConfigured && (
            <>
              <Divider className={classes.divider} />
              <div className={classes.googleWrap}>
                <GoogleLogin
                  onSuccess={googleSuccess}
                  onError={googleError}
                  text={isSignup ? 'signup_with' : 'signin_with'}
                  shape="pill"
                  width="320"
                />
              </div>
            </>
          )}

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
