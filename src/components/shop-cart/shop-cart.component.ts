import { property } from '@components/helpers';
import { LitElement } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';

// This element is connected to the Redux store.
import { RootState, store } from '@store';

// These are the actions needed by this element.
import { removeFromCart } from '@actions/shop';

// These are the reducers needed by this element.
import { cartItemsSelector, cartTotalSelector } from '@reducers/shop';
import { CartItem } from '@reducers/shop';

import template from './shop-cart.template';

export class ShopCart extends connect(store)(LitElement) {
  @property({type: Array})
  protected _items: CartItem[] = [];

  @property({type: Number})
  protected _total = 0;

  // This is called every time something is updated in the store.
  public stateChanged(state: RootState) {
    this._items = cartItemsSelector(state);
    this._total = cartTotalSelector(state);
  }

  protected render() {
    return template.call(this);
  }

  protected _removeButtonClicked(e: Event) {
    store.dispatch(removeFromCart((e.currentTarget as HTMLButtonElement).dataset.index));
  }
}

window.customElements.define('shop-cart', ShopCart);
