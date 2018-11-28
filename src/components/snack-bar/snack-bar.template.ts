import { html } from '@polymer/lit-element';
import { SnackBar } from './snack-bar.component';

import styles from './snack-bar.styles';

export default function template(this: SnackBar) {
  return html`
    ${styles}

    <slot></slot>
  `;
}
