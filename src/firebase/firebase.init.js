import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCzkQnsX_GBhr72NsknrrlakggoRR7civo",
    authDomain: "tictactoe-game-a349f.firebaseapp.com",
    databaseURL: "https://tictactoe-game-a349f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tictactoe-game-a349f",
    storageBucket: "tictactoe-game-a349f.appspot.com",
    messagingSenderId: "896085699919",
    appId: "1:896085699919:web:db1644bd1ae2f79212293a",
    measurementId: "G-1F3PKTCS0Y"
};

export const firebaseApp = initializeApp(firebaseConfig)

// used for the databas refs
