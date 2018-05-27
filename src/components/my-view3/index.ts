import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import buttonSharedStyles from '../button-shared-styles.scss';
import { PageViewElement } from '../page-view-element';
import sharedStyles from '../shared-styles.scss';
import '../shop-cart';
import '../shop-products';
import styles from './styles.scss';

// This element is connected to the redux store.
import { store } from '../../store';

// These are the actions needed by this element.
import { checkout } from '../../actions/shop';

// We are lazy loading its reducer.
import shop, { cartQuantitySelector } from '../../reducers/shop';

store.addReducers({
  shop,
});

class MyView3 extends connect(store)(PageViewElement) {
  _render({ _quantity, _error }) {
    return html`
      ${sharedStyles}
      ${buttonSharedStyles}
      ${styles}
      <section>
        <h2>Redux example: shopping cart</h2>
        <div class="circle">${_quantity}</div>

        <p>This is a slightly more advanced Redux example, that simulates a
          shopping cart: getting the products, adding/removing items to the
          cart, and a checkout action, that can sometimes randomly fail (to
          simulate where you would add failure handling). </p>
        <p>This view, as well as its 2 child elements, <code>&lt;shop-products&gt;</code> and
        <code>&lt;shop-cart&gt;</code> are connected to the Redux store.</p>
      </section>
      <section>
        <h3>Products</h3>
        <shop-products></shop-products>

        <br>
        <h3>Your Cart</h3>
        <shop-cart></shop-cart>

        <div>${_error}</div>
        <br>
        <p>
          <button class="checkout" hidden="${_quantity === 0}"
              on-click="${() => store.dispatch(checkout())}">
            Checkout
          </button>
        </p>
      </section>
    `;
  }

  static get properties() {
    return {
      // This is the data from the store.
      _quantity: Number,
      _error: String,
    };
  }

  // This is called every time something is updated in the store.
  _stateChanged(state: any) {
    this._quantity = cartQuantitySelector(state);
    this._error = state.shop.error;
  }
}

window.customElements.define('my-view3', MyView3);
