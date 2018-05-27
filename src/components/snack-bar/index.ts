import { html, LitElement } from '@polymer/lit-element';
import styles from './styles.scss';

class SnackBar extends LitElement {
  _render(props: any) {
    return html`
      ${styles}
      <slot></slot>
    `;
  }

  static get properties() {
    return {
      active: Boolean,
    };
  }
}

window.customElements.define('snack-bar', SnackBar);
