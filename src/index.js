import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from '@redux-saga/core';


import App from './App';
import reducers from './store/reducers' 
import watchDataFetch from './sagas/saga';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchDataFetch)

ReactDOM.render(
	<Provider store={store}>
	<React.StrictMode>
		<App />
	</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);
