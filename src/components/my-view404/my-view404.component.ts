import { customElement } from '@components/helpers';
import { PageViewElement } from '@components/page-view-element';

import template from './my-view404.template';

@customElement('my-view404')
export class MyView404 extends PageViewElement {
  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-view404': MyView404;
  }
}
