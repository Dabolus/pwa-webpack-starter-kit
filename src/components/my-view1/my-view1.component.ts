import { PageViewElement } from '@components/page-view-element';

import template from './my-view1.template';

export class MyView1 extends PageViewElement {
  protected render() {
    return template.call(this);
  }
}

window.customElements.define('my-view1', MyView1);
