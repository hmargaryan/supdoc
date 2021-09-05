import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyA2ScMqs06smCvdkzp-7i-Aq5FBeo3m7b8',
  authDomain: 'document-delivery-f59a7.firebaseapp.com',
  databaseURL: 'https://document-delivery-f59a7-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'document-delivery-f59a7',
  storageBucket: 'document-delivery-f59a7.appspot.com',
  messagingSenderId: '187143179163',
  appId: '1:187143179163:web:412dabe22d4de5316f6f3e'
})

export const auth = app.auth()
export default app
