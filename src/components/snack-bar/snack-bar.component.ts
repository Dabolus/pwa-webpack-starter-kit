import { customElement, LitElement, property } from 'lit-element';

import styles from './snack-bar.styles';
import template from './snack-bar.template';

@customElement('snack-bar')
export class SnackBar extends LitElement {
  public static styles = [styles];

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
