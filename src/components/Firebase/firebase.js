import app from "firebase/app";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA3y1ydgG4klEgAX--j2jlwuihdg1z4kAw",
  authDomain: "pathfinder-tools-7bdb6.firebaseapp.com",
  databaseURL: "https://pathfinder-tools-7bdb6.firebaseio.com",
  projectId: "pathfinder-tools-7bdb6",
  storageBucket: "pathfinder-tools-7bdb6.appspot.com",
  messagingSenderId: "350985729156",
  appId: "1:350985729156:web:05eff066296314fe95fed1"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  // *** Character API ***

  character = uid => this.db.ref(`characters/${uid}`);
  characters = () => this.db.ref("characters");

  // *** Game API ***

  game = uid => this.db.ref(`games/${uid}`);
  games = () => this.db.ref("games");
}

export default Firebase;
