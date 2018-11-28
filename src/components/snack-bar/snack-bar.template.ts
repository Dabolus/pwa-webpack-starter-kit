import { html } from '@polymer/lit-element';
import { SnackBar } from './snack-bar.component';

export default function template(this: SnackBar) {
  return html`<slot></slot>`;
}
