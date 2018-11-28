import { DECREMENT, INCREMENT } from '@actions/counter';
import { RootAction } from '@store';
import { Reducer } from 'redux';

export interface CounterState {
  clicks: number;
  value: number;
}

const INITIAL_STATE: CounterState = {
  clicks: 0,
  value: 0,
};

const counter: Reducer<CounterState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        clicks: state.clicks + 1,
        value: state.value + 1,
      };
    case DECREMENT:
      return {
        clicks: state.clicks + 1,
        value: state.value - 1,
      };
    default:
      return state;
  }
};

export default counter;
