import { PageViewElement } from '@components/page-view-element';
import { customElement, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { RootState, store } from '@store';

// These are the actions needed by this element.
import { checkout } from '@actions/shop';

// We are lazy loading its reducer.
import shop, { cartQuantitySelector } from '@reducers/shop';
store.addReducers({ shop });

import styles from './my-view3.styles';
import template from './my-view3.template';

// These are the shared styles needed by this element.
import buttonsSharedStyles from '@components/buttons-shared.styles';
import sharedStyles from '@components/shared.styles';

@customElement('my-view3')
export class MyView3 extends connect(store)(PageViewElement) {
  public static styles = [sharedStyles, buttonsSharedStyles, styles];

  @property({type: Number})
  protected _quantity = 0;

  @property({type: String})
  protected _error = '';

  // This is called every time something is updated in the store.
  public stateChanged(state: RootState) {
    this._quantity = cartQuantitySelector(state);
    this._error = state.shop!.error;
  }

  protected render() {
    return template.call(this);
  }

  protected _checkoutButtonClicked() {
    store.dispatch(checkout());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-view3': MyView3;
  }
}
