import { customElement, property } from '@components/helpers';
import { LitElement } from '@polymer/lit-element';

import template from './counter-element.template';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
@customElement('counter-element')
export class CounterElement extends LitElement {
  @property({type: Number})
  public clicks = 0;

  @property({type: Number})
  public value = 0;

  protected render() {
    return template.call(this);
  }

  protected _onIncrement() {
    this.value++;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-incremented'));
  }

  protected _onDecrement() {
    this.value--;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-decremented'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'counter-element': CounterElement;
  }
}
