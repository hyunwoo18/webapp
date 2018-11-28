import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

//import { BrowserRouter } from 'react-router-dom';

//import './index.css';
import App from './components/App';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);
//  <BrowserRouter>	  </BrowserRouter>,

ReactDOM.render(
		<App />,  
  document.getElementById('root')    );










