import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'tiktok-c99e2.firebaseapp.com',
    databaseURL: 'https://tiktok-c99e2-default-rtdb.firebaseio.com',
    projectId: 'tiktok-c99e2',
    storageBucket: 'tiktok-c99e2.appspot.com',
    messagingSenderId: '225842934949',
    appId: '1:225842934949:web:77b91cb67edf0aa98d094c',
    measurementId: 'G-0K5WPEYVKF',
}
export const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
