import firebase from 'firebase';
import {firebaseApiKey} from './secrets.js';

var config = {
  apiKey: firebaseApiKey,
  authDomain: "speezyflowy.firebaseapp.com",
  databaseURL: "https://speezyflowy.firebaseio.com",
  projectId: "speezyflowy",
  storageBucket: "speezyflowy.appspot.com",
  messagingSenderId: "706328063820"
};
const app = firebase.initializeApp(config);

export {
  app,
};
