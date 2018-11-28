import { LitElement, property } from '@polymer/lit-element';

import template from './snack-bar.template';

export class SnackBar extends LitElement {
  @property({type: Boolean})
  protected active = false;

  protected render() {
    return template.call(this);
  }
}

window.customElements.define('snack-bar', SnackBar);
