import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import ForgotPassword from './components/Auth/ForgotPassword';
import About from './components/About/About';
import Faq from './components/Faq/Faq';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Feedback from './components/Feedback/Feedback';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Feedback />
      <Container maxWidth="xl">
        <Navbar />
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path="/about" exact component={About} />
            <Route path="/faq" exact component={Faq} />
            <Route path="/profile" exact component={Profile} />
            <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
            <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
            <Route path="/forgot-password" exact component={() => (!user ? <ForgotPassword /> : <Redirect to="/posts" />)} />
            <Route component={NotFound} />
          </Switch>
        </ErrorBoundary>
        <Footer />
      </Container>
    </BrowserRouter>
  );
};

export default App;
