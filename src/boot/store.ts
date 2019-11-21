import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, compose, createStore } from 'redux';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';

import reducer from '../redux/reducers';
import api from '../redux/middlewares/api';

const persistConfig: PersistConfig = {
  key: 'root',
  storage
};

export default function configureStore(onCompletion?: () => void) {
  const middlewares = [thunk, api];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const pReducer = persistReducer(persistConfig, reducer);
  const store = createStore(pReducer, enhancer);
  const persistor = persistStore(store, undefined, onCompletion);

  return { store, persistor };
}
