import React, { StrictMode } from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./App";
import "./style.css";
import {createStore, applyMiddleware} from 'redux';
import  createSagaMiddleware from 'redux-saga';
import reducers from './redux/reducers';
import mySaga from './redux/sagas';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);


const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store} >
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  rootElement
);
