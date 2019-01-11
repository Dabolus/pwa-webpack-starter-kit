import { PageViewElement } from '@components/page-view-element';
import { customElement } from 'lit-element';

import template from './my-view1.template';

@customElement('my-view1')
export class MyView1 extends PageViewElement {
  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-view1': MyView1;
  }
}
