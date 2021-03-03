import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAtxxOj1hkT-pyFU6JuDe2hS2iSWId4eCE',
  authDomain: 'robinhood-trading-app.firebaseapp.com',
  projectId: 'robinhood-trading-app',
  storageBucket: 'robinhood-trading-app.appspot.com',
  messagingSenderId: '685254651173',
  appId: '1:685254651173:web:15bee49a85fe194a1b3ecc'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
export { db }