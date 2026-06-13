import React from 'react';
import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <span className={classes.copy}>
        © 2026 Memories. Made for the moments worth keeping. Made by Aryan Patel.
      </span>
    </footer>
  );
};

export default Footer;
