import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
