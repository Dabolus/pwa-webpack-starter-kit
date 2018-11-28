import { PageViewElement } from '@components/page-view-element';

import template from './my-view404.template';

export class MyView404 extends PageViewElement {
  protected render() {
    return template.call(this);
  }
}

window.customElements.define('my-view404', MyView404);
