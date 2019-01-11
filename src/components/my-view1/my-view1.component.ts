import { PageViewElement } from '@components/page-view-element';
import { customElement } from 'lit-element';

import styles from './my-view1.styles';
import template from './my-view1.template';

// These are the shared styles needed by this element.
import sharedStyles from '@components/shared.styles';

@customElement('my-view1')
export class MyView1 extends PageViewElement {
  public static styles = [sharedStyles, styles];

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-view1': MyView1;
  }
}
