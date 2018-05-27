import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import '../counter-element';
import { PageViewElement } from '../page-view-element';
import sharedStyles from '../shared-styles.scss';

// This element is connected to the redux store.
import { store } from '../../store';

// These are the actions needed by this element.
import { decrement, increment } from '../../actions/counter';

// We are lazy loading its reducer.
import counter from '../../reducers/counter';

store.addReducers({
  counter,
});

class MyView2 extends connect(store)(PageViewElement) {
  _render(props: any) {
    return html`
      ${sharedStyles}
      <section>
        <h2>Redux example: simple counter</h2>
        <div class="circle">${props._clicks}</div>
        <p>This page contains a reusable <code>&lt;counter-element&gt;</code>. The
        element is not built in a Redux-y way (you can think of it as being a
        third-party element you got from someone else), but this page is connected to the
        Redux store. When the element updates its counter, this page updates the values
        in the Redux store, and you can see the total number of clicks reflected in
        the bubble above.</p>
        <br><br>
      </section>
      <section>
        <p>
          <counter-element value="${props._value}" clicks="${props._clicks}"
              on-counter-incremented="${() => store.dispatch(increment())}"
              on-counter-decremented="${() => store.dispatch(decrement())}">
          </counter-element>
        </p>
      </section>
    `;
  }

  static get properties() {
    return {
      // This is the data from the store.
      _clicks: Number,
      _value: Number,
    };
  }

  // This is called every time something is updated in the store.
  _stateChanged(state: any) {
    this._clicks = state.counter.clicks;
    this._value = state.counter.value;
  }
}

window.customElements.define('my-view2', MyView2);
