import { createStore, applyMiddleware, compose } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import root from './reducers';

const middleware = [thunk, logger];

const initState = {};

const store = createStore(
  root,
  initState,
  compose(
    applyMiddleware(...middleware)
    // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;