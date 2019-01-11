import { customElement, LitElement, property } from 'lit-element';

import template from './snack-bar.template';

@customElement('snack-bar')
export class SnackBar extends LitElement {
  @property({type: Boolean})
  protected active = false;

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'snack-bar': SnackBar;
  }
}
