import { html } from 'lit-element';
import { ShopItem } from './shop-item.component';

export default function template(this: ShopItem) {
  return html`
    ${this.name}:
    <span ?hidden="${this.amount === 0}">${this.amount} * </span>
      $${this.price}
    </span>
  `;
}
