import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCGA5-g6ibCAgv52kOrIjVPRGN3OfgCXr0",
    authDomain: "pwa-reference.firebaseapp.com",
    projectId: "pwa-reference",
    storageBucket: "pwa-reference.appspot.com",
    messagingSenderId: "346562453988",
    appId: "1:346562453988:web:92db23fd9d3b955bb267f1",
    databaseURL: "https://pwa-reference.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);