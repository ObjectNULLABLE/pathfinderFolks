import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

import AppMenu from "../AppMenu";
import FolksPage from "../Folks";
import CharactersPage from "../Characters";
import GamesPage from "../Games";
import SignUpPage from "../SignUp";
import { withFirebase } from "../Firebase";

import "./App.css";
import SignInPage from "../SignIn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser =>
      this.setState({ authUser })
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    // console.log(this.state.authUser ? this.state.authUser : "not logined");
    return (
      <Router>
        <div className="App">
          <AppMenu authUser={this.state.authUser} />
          <div className="Page">
            <Route path={ROUTES.FOLKS} component={FolksPage} />
            <Route path={ROUTES.GAMES} component={GamesPage} />
            <Route path={ROUTES.CHARACTERS} component={CharactersPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.PASSWORD_FORGET} />
            <Route path={ROUTES.ACCOUNT} />
          </div>
        </div>
      </Router>
    );
  }
}

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
