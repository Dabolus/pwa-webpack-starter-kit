import { PageViewElement } from '@components/page-view-element';
import { customElement } from 'lit-element';

import styles from './my-view404.styles';
import template from './my-view404.template';

// These are the shared styles needed by this element.
import sharedStyles from '@components/shared.styles';

@customElement('my-view404')
export class MyView404 extends PageViewElement {
  public static styles = [sharedStyles, styles];

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-view404': MyView404;
  }
}
