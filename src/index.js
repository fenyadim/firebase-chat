import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase";

import App from './App';
import { store } from "./redux/store";

import './index.css';

const firebaseConfig = {
  apiKey: "AIzaSyBg3MjTG_LFkxmx7086bjzeCM_h9krSU_k",
  authDomain: "fir-nchat.firebaseapp.com",
  projectId: "fir-nchat",
  storageBucket: "fir-nchat.appspot.com",
  messagingSenderId: "897032280665",
  appId: "1:897032280665:web:296b070957db93bb66ef48",
  measurementId: "G-N4DJJS4R33"
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
