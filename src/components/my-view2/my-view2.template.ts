import { html } from 'lit-element';
import { MyView2 } from './my-view2.component';

import styles from './my-view2.styles';

// These are the elements needed by this element.
import '@components/counter-element/counter-element.component';

// These are the shared styles needed by this element.
import sharedStyles from '@components/shared.styles';

export default function template(this: MyView2) {
  return html`
    ${sharedStyles}
    ${styles}

    <section>
      <h2>Redux example: simple counter</h2>
      <div class="circle">${this._value}</div>
      <p>This page contains a reusable <code>&lt;counter-element&gt;</code>. The
      element is not built in a Redux-y way (you can think of it as being a
      third-party element you got from someone else), but this page is connected to the
      Redux store. When the element updates its counter, this page updates the values
      in the Redux store, and you can see the current value of the counter reflected in
      the bubble above.</p>
      <br><br>
    </section>
    <section>
      <p>
        <counter-element value="${this._value}" clicks="${this._clicks}"
            @counter-incremented="${this._counterIncremented}"
            @counter-decremented="${this._counterDecremented}">
        </counter-element>
      </p>
    </section>
  `;
}
