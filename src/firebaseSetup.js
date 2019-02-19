import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import { API_KEY } from './util/API';

var config = {
  apiKey: API_KEY,
  authDomain: 'chit-chat-ee570.firebaseapp.com',
  databaseURL: 'https://chit-chat-ee570.firebaseio.com',
  projectId: 'chit-chat-ee570',
  storageBucket: 'chit-chat-ee570.appspot.com',
  messagingSenderId: '660885860948'
};
firebase.initializeApp(config);

export default firebase;
