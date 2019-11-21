import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import AppMenu from '../AppMenu';
import FolksPage from '../Folks';
import SignUpPage from '../SignUp';

import './App.css';
import SignInPage from '../SignIn';

const App = () => (
  <Router>
    <div className="App">
      <AppMenu />
      <Route path={ROUTES.FOLKS} component={FolksPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.PASSWORD_FORGET} />
      <Route path={ROUTES.ACCOUNT} />
    </div>
  </Router>
);

export default App;
