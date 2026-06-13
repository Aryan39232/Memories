import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { reducers } from './reducers';
import theme from './theme';
import App from './App';
import './index.css';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

ReactDOM.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById('root'),
);
