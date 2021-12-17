import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCaar-fdinvorLsFQxO9RoB83bOv44xOi8',
  authDomain: 'mail-clone-react.firebaseapp.com',
  projectId: 'mail-clone-react',
  storageBucket: 'mail-clone-react.appspot.com',
  messagingSenderId: '239730316239',
  appId: '1:239730316239:web:98c6b0efe58d237dca38ba',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
