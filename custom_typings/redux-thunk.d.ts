import { Store } from 'redux';
import thunk from 'redux-thunk';

export interface StoreWithThunk extends Store {
  addReducers: (reducers: any) => void;
}
