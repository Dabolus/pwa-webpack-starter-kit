import { customElement, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';

// This element is connected to the Redux store.
import { RootState, store } from '@store';

// These are the actions needed by this element.
import { addToCart, getAllProducts } from '@actions/shop';

// These are the reducers needed by this element.
import { ProductsState } from '@reducers/shop';

import template from './shop-products.template';

@customElement('shop-products')
export class ShopProducts extends connect(store)(LitElement) {
  @property({type: Object})
  protected _products: ProductsState = {};

  // This is called every time something is updated in the store.
  public stateChanged(state: RootState) {
    this._products = state.shop!.products;
  }

  protected render() {
    return template.call(this);
  }

  protected firstUpdated() {
    store.dispatch(getAllProducts());
  }

  protected _addButtonClicked(e: Event) {
    store.dispatch(addToCart((e.currentTarget as HTMLButtonElement).dataset.index));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shop-products': ShopProducts;
  }
}
