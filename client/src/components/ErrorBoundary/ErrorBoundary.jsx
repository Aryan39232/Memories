import React from 'react';
import { Paper, Typography, Button, Container } from '@material-ui/core';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Keep a console trace for debugging; never surface a raw stack to the user.
    console.error('Unhandled UI error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" style={{ marginTop: '12vh' }}>
          <Paper elevation={6} style={{ padding: '40px', borderRadius: 22, textAlign: 'center' }}>
            <ReportProblemOutlinedIcon style={{ fontSize: 52, color: '#FF6B6B' }} />
            <Typography variant="h4" style={{ margin: '14px 0 8px' }}>Something went wrong</Typography>
            <Typography variant="body1" color="textSecondary" style={{ marginBottom: 26 }}>
              The page hit an unexpected error. Reloading usually fixes it — your memories are safe.
            </Typography>
            <Button variant="contained" color="primary" onClick={this.handleReload} disableElevation>
              Back to memories
            </Button>
          </Paper>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
