import { DECREMENT, INCREMENT } from '~/actions/counter';

const counter = (state = { clicks: 0, value: 0 }, action: any) => { // TODO: switch from any to a more specific action type
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
