declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer,
  StoreEnhancer,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { AppAction } from './actions/app';
import { CounterAction } from './actions/counter';
import { ShopAction } from './actions/shop';
import app, { AppState } from './reducers/app';
import { CounterState } from './reducers/counter';
import { ShopState } from './reducers/shop';

// Overall state extends static states and partials lazy states.
export interface RootState {
  app?: AppState;
  counter?: CounterState;
  shop?: ShopState;
}

export type RootAction = AppAction | CounterAction | ShopAction;

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
  f1: StoreEnhancer<Ext0, StateExt0>, f2: StoreEnhancer<Ext1, StateExt1>,
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management
export const store = createStore(
  (state) => state as Reducer<RootState, RootAction>,
  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>)),
);

// Initially loaded reducers.
store.addReducers({ app });
