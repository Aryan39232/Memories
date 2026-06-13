import React from 'react';
import { Container, Paper, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchOffIcon from '@material-ui/icons/SearchOutlined';

const NotFound = () => (
  <Container maxWidth="sm" className="mem-rise" style={{ marginTop: '10vh' }}>
    <Paper elevation={6} style={{ padding: '48px 32px', borderRadius: 22, textAlign: 'center' }}>
      <SearchOffIcon style={{ fontSize: 52, color: '#5B3FA8' }} />
      <Typography variant="h3" style={{ margin: '12px 0 6px' }}>404</Typography>
      <Typography variant="h6" gutterBottom>This page wandered off</Typography>
      <Typography variant="body1" color="textSecondary" style={{ marginBottom: 26 }}>
        The page you’re looking for doesn’t exist or has moved.
      </Typography>
      <Button component={Link} to="/posts" variant="contained" color="primary" disableElevation>
        Back to memories
      </Button>
    </Paper>
  </Container>
);

export default NotFound;
