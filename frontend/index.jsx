import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import {Router, browserHistory} from 'react-router';
import BattleTag from './components/battleTag.js';
// import routes from './routes';


// import promise from 'redux-promise';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
	<BattleTag/>, document.querySelector('.app'));


