import {
  CLOSE_SNACKBAR, OPEN_SNACKBAR, UPDATE_DRAWER_STATE, UPDATE_OFFLINE, UPDATE_PAGE,
} from '~/actions/app';

const app = (state = { drawerOpened: false }, action: any) => { // TODO: switch from any to a more specific action type
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline,
      };
    case UPDATE_DRAWER_STATE:
      return {
        ...state,
        drawerOpened: action.opened,
      };
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true,
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false,
      };
    default:
      return state;
  }
};

export default app;
