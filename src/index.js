import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
import "firebase/analytics";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from './App';
import { store } from "./redux/store";

import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const firebaseConfig = {
  apiKey: "AIzaSyBg3MjTG_LFkxmx7086bjzeCM_h9krSU_k",
  authDomain: "fir-nchat.firebaseapp.com",
  databaseURL: "https://fir-nchat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-nchat",
  storageBucket: "fir-nchat.appspot.com",
  messagingSenderId: "897032280665",
  appId: "1:897032280665:web:296b070957db93bb66ef48",
  measurementId: "G-N4DJJS4R33"
}

firebase.initializeApp(firebaseConfig)

let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
