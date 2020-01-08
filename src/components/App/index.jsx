// import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";

import AppMenu from "../AppMenu";
import FolksPage from "../Folks";
import CharactersPage from "../CharacterList";
import CharacterPage from "../Character";
import GamesPage from "../Games";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";

import "./App.css";

import React, { useState, useEffect } from "react";

export const App = ({ firebase }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser =>
      setAuthUser(authUser)
    );
    return () => listener();
  }, [firebase.auth]);

  return (
    <Router>
      <div className="App">
        <AppMenu authUser={authUser} />
        <div className="Page">
          <Route path={ROUTES.FOLKS} component={FolksPage} />
          <Route path={ROUTES.GAMES} component={GamesPage} />
          <Route path={ROUTES.CHARACTERS} component={CharactersPage} />
          <Route path={ROUTES.CHARACTER} component={CharacterPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.PASSWORD_FORGET} />
          <Route path={ROUTES.ACCOUNT} />
        </div>
      </div>
    </Router>
  );
};

// const PrivateRoute = ({ authenticated, children, ...rest }) => {
//   return (
//     <Route

//       {...rest}
//       render={({ location }) =>
//         authenticated ? (
//           children
//         ) : (
//             <Redirect
//               to={{
//                 pathname: ROUTES.SIGN_IN,
//                 state: { from: location }
//               }}
//             />
//           )
//       }
//     />
//   );
// }

export default withFirebase(App);
