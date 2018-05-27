import { html, LitElement } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin';
import '../shop-item';

// This element is connected to the redux store.
import { removeFromCart } from '../../actions/shop';
import { cartItemsSelector, cartTotalSelector } from '../../reducers/shop';
import { store } from '../../store';
import buttonSharedStyles from '../button-shared-styles.scss';
import { removeFromCartIcon } from '../my-icons';
import styles from './styles.scss';

class ShopCart extends connect(store)(LitElement) {
  _render({ _items, _total }: any) {
    return html`
      ${buttonSharedStyles}
      ${styles}
      <p hidden="${_items.length !== 0}">Please add some products to cart.</p>
      ${_items.map((item: any) =>
      html`
          <div>
            <shop-item name="${item.title}" amount="${item.amount}" price="${item.price}"></shop-item>
            <button
                on-click="${(e: Event) => store.dispatch(removeFromCart(e.currentTarget.dataset['index']))}"
                data-index$="${item.id}"
                title="Remove from cart">
              ${removeFromCartIcon}
            </button>
          </div>
        `,
    )}
      <p hidden="${!_items.length}"><b>Total:</b> ${_total}</p>
    `;
  }

  static get properties() {
    return {
      _items: Array,
      _total: Number,
    };
  }

  // This is called every time something is updated in the store.
  _stateChanged(state: any) {
    this._items = cartItemsSelector(state);
    this._total = cartTotalSelector(state);
  }
}

window.customElements.define('shop-cart', ShopCart);
