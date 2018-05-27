import { Dispatch } from 'redux';

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const navigate = (path: string) => (dispatch: Dispatch<any, void>) => {
  // Extract the page name from path.
  const page = path === '/' ? 'view1' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

const loadPage = (page: string) => async (dispatch: Dispatch<any, void>) => {
  // If the page is invalid, set to 404. The is also a good spot to check
  // other location things like sub-path or query params.
  if (['view1', 'view2', 'view3'].indexOf(page) === -1) {
    page = 'view404';
  }

  dispatch(updatePage(page));

  switch (page) {
    case 'view1':
      await import('../components/my-view1');
      // Put code here that you want it to run every time when
      // navigate to view1 page and my-view1.js is loaded
      break;
    case 'view2':
      await import('../components/my-view2');
      break;
    case 'view3':
      // TODO: discover what is the cyclic dependency that makes everything crash when uncommenting next line
      // await import('../components/my-view3');
      break;
    default:
      await import('../components/my-view404');
  }
};

const updatePage = (page: string) => {
  return {
    type: UPDATE_PAGE,
    page,
  };
};

let snackbarTimer: number;

export const showSnackbar = () => (dispatch: Dispatch<any, void>) => {
  dispatch({
    type: OPEN_SNACKBAR,
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000);
};

export const updateOffline = (offline: boolean) => (dispatch: Dispatch<any, void>, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline,
  });
};

export const updateLayout = (wide: boolean) => (dispatch: Dispatch<any, void>, getState) => {
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
};

export const updateDrawerState = (opened: boolean) => (dispatch: Dispatch<any, void>, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened,
    });
  }
};
