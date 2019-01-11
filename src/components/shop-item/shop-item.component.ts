import { customElement, LitElement, property } from 'lit-element';

import styles from './shop-item.styles';
import template from './shop-item.template';

// This element is *not* connected to the Redux store.
@customElement('shop-item')
export class ShopItem extends LitElement {
  public static styles = [styles];

  @property({type: String})
  protected name = '';

  @property({type: Number})
  protected amount = 0;

  @property({type: Number})
  protected price = 0;

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shop-item': ShopItem;
  }
}
