import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store';
import { Provider } from 'react-redux';
import Contextprovider from './components/context/ContextProvider';
ReactDOM.render(
  <Contextprovider>
  <Provider store={store}>
      <Router>
        <App />
      </Router>
  </Provider>
  </Contextprovider>,
  document.getElementById('root')
);