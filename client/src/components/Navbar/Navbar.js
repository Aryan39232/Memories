import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/memoriesLogo.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const NAV = [
  { label: 'Memories', to: '/posts' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
];

const NAV_AUTH = [{ label: 'My memories', to: '/profile' }];

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const isActive = (to) => location.pathname === to || (to === '/posts' && location.pathname.startsWith('/posts'));

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesLogo} alt="Memories" height="42px" />
        <span className={classes.wordmark}>Memories</span>
      </Link>

      <div className={classes.navLinks}>
        {[...NAV, ...(user?.result ? NAV_AUTH : [])].map(({ label, to }) => (
          <Button
            key={to}
            component={Link}
            to={to}
            className={`${classes.navLink} ${isActive(to) ? classes.navLinkActive : ''}`}
            disableRipple
          >
            {label}
          </Button>
        ))}
      </div>

      <Toolbar className={classes.toolbar} disableGutters>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar component={Link} to="/profile" className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name?.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="subtitle1">{user?.result.name}</Typography>
            <Button variant="outlined" color="secondary" onClick={logout}>Log out</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary" disableElevation>Sign in</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
