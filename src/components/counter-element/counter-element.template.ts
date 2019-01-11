import { html } from 'lit-element';
import { CounterElement } from './counter-element.component';

// These are the elements needed by this element.
import { minusIcon, plusIcon } from '@components/my-icons';

export default function template(this: CounterElement) {
  return html`
    <div>
      <p>
        Clicked: <span>${this.clicks}</span> times.
        Value is <span>${this.value}</span>.
        <button @click="${this._onIncrement}" title="Add 1">${plusIcon}</button>
        <button @click="${this._onDecrement}" title="Minus 1">${minusIcon}</button>
      </p>
    </div>
  `;
}
