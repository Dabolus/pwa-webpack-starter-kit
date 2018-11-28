import { Action, ActionCreator } from 'redux';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export interface CounterActionIncrement extends Action<'INCREMENT'> {}
export interface CounterActionDecrement extends Action<'DECREMENT'> {}
export type CounterAction = CounterActionIncrement | CounterActionDecrement;

export const increment: ActionCreator<CounterActionIncrement> = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement: ActionCreator<CounterActionDecrement> = () => {
  return {
    type: DECREMENT,
  };
};
