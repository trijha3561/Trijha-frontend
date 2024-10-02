// FirebaseAuthUI.js
import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import { auth } from './firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const FirebaseAuthUI = () => {
  useEffect(() => {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
    };

    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', uiConfig);

    return () => ui.reset();
  }, []);

  return <div id="firebaseui-auth-container"></div>;
};

export default FirebaseAuthUI;
  