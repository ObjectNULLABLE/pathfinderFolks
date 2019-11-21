import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA3y1ydgG4klEgAX--j2jlwuihdg1z4kAw",
  authDomain: "pathfinder-tools-7bdb6.firebaseapp.com",
  databaseURL: "https://pathfinder-tools-7bdb6.firebaseio.com",
  projectId: "pathfinder-tools-7bdb6",
  storageBucket: "pathfinder-tools-7bdb6.appspot.com",
  messagingSenderId: "350985729156",
  appId: "1:350985729156:web:05eff066296314fe95fed1"
}

class Firebase {
  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase