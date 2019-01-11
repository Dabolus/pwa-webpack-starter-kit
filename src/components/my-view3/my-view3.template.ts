import { html } from 'lit-element';
import { MyView3 } from './my-view3.component';

import styles from './my-view3.styles';

// These are the elements needed by this element.
import { addToCartIcon } from '@components/my-icons';
import '@components/shop-cart/shop-cart.component';
import '@components/shop-products/shop-products.component';

// These are the shared styles needed by this element.
import buttonsSharedStyles from '@components/buttons-shared.styles';
import sharedStyles from '@components/shared.styles';

export default function template(this: MyView3) {
  return html`
    ${sharedStyles}
    ${buttonsSharedStyles}
    ${styles}

    <section>
      <h2>Redux example: shopping cart</h2>
      <div class="cart">${addToCartIcon}<div class="circle small">${this._quantity}</div></div>
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

      <div>${this._error}</div>
      <br>
      <p>
        <button ?hidden="${this._quantity === 0}" @click="${this._checkoutButtonClicked}">
          Checkout
        </button>
      </p>
    </section>
  `;
}
