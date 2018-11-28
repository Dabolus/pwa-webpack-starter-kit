import { property } from '@components/helpers';
import { PageViewElement } from '@components/page-view-element';
import { connect } from 'pwa-helpers/connect-mixin';

// This element is connected to the Redux store.
import { RootState, store } from '@store';

// These are the actions needed by this element.
import { decrement, increment } from '@actions/counter';

// We are lazy loading its reducer.
import counter from '@reducers/counter';
store.addReducers({ counter });

// These are the elements needed by this element.
import '@components/counter-element/counter-element.component';

import template from './my-view2.template';

export class MyView2 extends connect(store)(PageViewElement) {
  @property({type: Number})
  protected _clicks = 0;

  @property({type: Number})
  protected _value = 0;

  // This is called every time something is updated in the store.
  public stateChanged(state: RootState) {
    this._clicks = state.counter!.clicks;
    this._value = state.counter!.value;
  }

  protected _counterIncremented() {
    store.dispatch(increment());
  }

  protected _counterDecremented() {
    store.dispatch(decrement());
  }

  protected render() {
    return template.call(this);
  }
}

window.customElements.define('my-view2', MyView2);
