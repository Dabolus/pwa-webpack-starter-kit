import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';
import { customElement, LitElement, property, PropertyValues } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query';
import { updateMetadata } from 'pwa-helpers/metadata';
import { installOfflineWatcher } from 'pwa-helpers/network';
import { installRouter } from 'pwa-helpers/router';

// This element is connected to the Redux store.
import { RootState, store } from '@store';

// These are the actions needed by this element.
import {
  navigate,
  updateDrawerState,
  updateOffline,
} from '@actions/app';

// The following line imports the type only - it will be removed by tsc so
// another import for app-drawer.js is required below.
import { AppDrawerElement } from '@polymer/app-layout/app-drawer/app-drawer';

import styles from './my-app.styles';
import template from './my-app.template';

@customElement('my-app')
export class MyApp extends connect(store)(LitElement) {
  public static styles = styles;

  @property({type: String})
  public appTitle = '';

  @property({type: String})
  protected _page = '';

  @property({type: Boolean})
  protected _drawerOpened = false;

  @property({type: Boolean})
  protected _snackbarOpened = false;

  @property({type: Boolean})
  protected _offline = false;

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  public stateChanged(state: RootState) {
    this._page = state.app!.page;
    this._offline = state.app!.offline;
    this._snackbarOpened = state.app!.snackbarOpened;
    this._drawerOpened = state.app!.drawerOpened;
  }

  protected render() {
    return template.call(this);
  }

  protected firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
        () => store.dispatch(updateDrawerState(false)));
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        description: pageTitle,
        title: pageTitle,
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  protected _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }

  protected _drawerOpenedChanged(e: Event) {
    store.dispatch(updateDrawerState((e.target as AppDrawerElement).opened));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp;
  }
}
