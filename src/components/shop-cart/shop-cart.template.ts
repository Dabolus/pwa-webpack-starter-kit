import { html } from 'lit-element';
import { ShopCart } from './shop-cart.component';

import styles from './shop-cart.styles';

// These are the elements needed by this element.
import { removeFromCartIcon } from '@components/my-icons';
import '@components/shop-item/shop-item.component';

// These are the shared styles needed by this element.
import buttonsSharedStyles from '@components/buttons-shared.styles';

export default function template(this: ShopCart) {
  return html`
    ${buttonsSharedStyles}
    ${styles}

    <p ?hidden="${this._items.length !== 0}">Please add some products to cart.</p>
      ${this._items.map((item) =>
        html`
          <div>
            <shop-item
              .name="${item.title}"
              .amount="${item.amount}"
              .price="${item.price}">
            </shop-item>
            <button
              @click="${this._removeButtonClicked}"
              data-index="${item.id}"
              title="Remove from cart">
              ${removeFromCartIcon}
            </button>
          </div>
      `)}
    <p ?hidden="${!this._items.length}"><b>Total:</b> ${this._total}</p>
  `;
}
