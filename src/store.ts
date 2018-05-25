import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer';
import { applyMiddleware, combineReducers, compose as origCompose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { StoreWithThunk } from '../custom_typings/vendor';
import app from './reducers/app';

// TODO: Uncomment this line as soon as Redux Devtools Chrome Extension adds compatibiliy for Redux 4
// const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

export const store: StoreWithThunk = createStore(
  (state, action) => state,
  // TODO: Replace the next line with the one commented behing it as soon as Redux Devtools Chrome Extension adds compatibiliy for Redux 4
  origCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk)),
  // compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk)),
);

// Initially loaded reducers.
store.addReducers({ app });
