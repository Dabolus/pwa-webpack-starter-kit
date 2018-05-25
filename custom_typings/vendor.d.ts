import { Store } from 'redux';
import thunk from 'redux-thunk';

export type StoreWithThunk = Store & thunk;
