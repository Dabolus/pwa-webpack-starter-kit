import { html } from 'lit-element';
import { ShopItem } from './shop-item.component';

import styles from './shop-item.styles';

export default function template(this: ShopItem) {
  return html`
    ${styles}

    ${this.name}:
    <span ?hidden="${this.amount === 0}">${this.amount} * </span>
      $${this.price}
    </span>
  `;
}
