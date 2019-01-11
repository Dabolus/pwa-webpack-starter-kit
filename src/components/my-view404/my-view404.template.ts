import { html } from 'lit-element';
import { MyView404 } from './my-view404.component';

import styles from './my-view404.styles';

// These are the shared styles needed by this element.
import sharedStyles from '@components/shared.styles';

export default function template(this: MyView404) {
  return html`
    ${sharedStyles}
    ${styles}

    <section>
      <h2>Oops! You hit a 404</h2>
      <p>The page you're looking for doesn't seem to exist. Head back
          <a href="/">home</a> and try again?
      </p>
    </section>
  `;
}
