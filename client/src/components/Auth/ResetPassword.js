import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory, useParams } from 'react-router-dom';

import { resetPassword } from '../../actions/auth';
import useStyles from './styles';
import Input from './input';

const ResetPassword = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();
  const classes = useStyles();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(resetPassword(token, form, history));
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
        <Typography component="h1" variant="h5">Create new password</Typography>
        <Typography variant="body2" className={classes.subtitle}>
          Enter and confirm your new password below.
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="password"
              label="New password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={() => setShowPassword(!showPassword)}
            />
            <Input name="confirmPassword" label="Confirm new password" handleChange={handleChange} type="password" />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading} disableElevation>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset password'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
