import firebase from 'firebase'
var config = {
    apiKey: process.env.apiKey,
    authDomain: "kawancicilfe.firebaseapp.com",
    databaseURL: "https://kawancicilfe.firebaseio.com",
    projectId: "kawancicilfe",
    storageBucket: "kawancicilfe.appspot.com",
    messagingSenderId: "612742536411"
  };
  firebase.initializeApp(config);

export const Database = firebase.database()
