import { html } from '@polymer/lit-element';

// These are the elements needed by this element.
import { addToCartIcon } from '@components/my-icons';
import '@components/shop-item/shop-item.component';

// These are the shared styles needed by this element.
import buttonsSharedStyles from '@components/buttons-shared.styles';

import { ShopProducts } from './shop-products.component';
import styles from './shop-products.styles';

export default function template(this: ShopProducts) {
  return html`
    ${buttonsSharedStyles}
    ${styles}

    ${Object.keys(this._products).map((key) => {
      const item = this._products[key];
      return html`
        <div>
          <shop-item
            name="${item.title}"
            amount="${item.inventory}"
            price="${item.price}">
          </shop-item>
          <button
            .disabled="${item.inventory === 0}"
            @click="${this._addButtonClicked}"
            data-index="${item.id}"
            title="${item.inventory === 0 ? 'Sold out' : 'Add to cart' }">
            ${item.inventory === 0 ? 'Sold out' : addToCartIcon }
          </button>
        </div>
      `;
    })}
  `;
}
