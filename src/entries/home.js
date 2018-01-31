import React from 'react';
import { hydrate } from 'react-dom';
import Home from '../pages/containers/home';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/index';
import { Map as map } from 'immutable';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';

// Midleware
// const logger = ({ getState, dispatch }) => next => action => {
//     console.log('Este es mi viejo estado', getState().toJS());
//     console.log('Vamos a emplear esta acción', action);
//     const value = next(action);
//     console.log('Este es mi nuevo estado', getState().toJS());
//     return value;
// }

const store = createStore(
    reducer,
    map(),
    composeWithDevTools(
        applyMiddleware(
            logger,
            thunk
        )
    )
);

console.log(store.getState());

const homeContainer = document.getElementById('home-container')

hydrate(
    <Provider store={store}>
        <Home />
    </Provider>
    , homeContainer);

