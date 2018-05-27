import { html, LitElement } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';

// This element is connected to the redux store.
import { addToCart, getAllProducts } from '../../actions/shop';
import { store } from '../../store';
import buttonSharedStyles from '../button-shared-styles.scss';
import { addToCartIcon } from '../my-icons';
import styles from './styles.scss';

class ShopProducts extends connect(store)(LitElement) {
  _render({ _products }: any) {
    return html`
      ${buttonSharedStyles}
      ${styles}
      ${Object.keys(_products).map((key) => {
      const item = _products[key];
      return html`
          <div>
            <shop-item name="${item.title}" amount="${item.inventory}" price="${item.price}"></shop-item>
            <button
                disabled="${item.inventory === 0}"
                on-click="${(e: Event) => store.dispatch(addToCart(e.currentTarget.dataset['index']))}"
                data-index$="${item.id}"
                title="${item.inventory === 0 ? 'Sold out' : 'Add to cart' }">
              ${item.inventory === 0 ? 'Sold out' : addToCartIcon }
            </button>
          </div>
        `;
    })}
    `;
  }

  static get properties() {
    return {
      _products: Object,
    };
  }

  _firstRendered() {
    store.dispatch(getAllProducts());
  }

  // This is called every time something is updated in the store.
  _stateChanged(state: any) {
    this._products = state.shop.products;
  }
}

window.customElements.define('shop-products', ShopProducts);
