import { html } from '@polymer/lit-element';
import { PageViewElement } from '../page-view-element';
import sharedStyles from '../shared-styles.scss';

class MyView404 extends PageViewElement {
  _render(props: any) {
    return html`
      ${sharedStyles}
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>The page you're looking for doesn't seem to exist. Head back
           <a href="/">home</a> and try again?
        </p>
      </section>
    `;
  }
}

window.customElements.define('my-view404', MyView404);
