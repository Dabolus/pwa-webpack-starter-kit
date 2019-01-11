import { html } from 'lit-element';
import { MyView1 } from './my-view1.component';

import styles from './my-view1.styles';

// These are the shared styles needed by this element.
import sharedStyles from '@components/shared.styles';

export default function template(this: MyView1) {
  return html`
    ${sharedStyles}
    ${styles}

    <section>
      <h2>Static page</h2>
      <p>This is a text-only page.</p>
      <p>It doesn't do anything other than display some static text.</p>
    </section>
    <section>
      <h2>Welcome</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac nisi orci.
        Maecenas sollicitudin diam in diam efficitur cursus. Morbi sollicitudin in
        justo tincidunt placerat. Integer tincidunt elementum nisi, eu ornare dolor
        lacinia eget. Fusce pulvinar massa eget odio placerat, commodo molestie ipsum
        tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Suspendisse porttitor id purus eu cursus. Suspendisse
        arcu nulla, mattis vel hendrerit et, malesuada a elit. Nam at diam ornare, aliquet
        est sed, malesuada metus. Cras nec enim vel nibh tincidunt euismod ut et enim.
        Etiam pharetra eros in sodales iaculis. Duis sagittis urna et cursus mollis.
        Cras tempor rutrum est. Praesent sollicitudin ligula at laoreet placerat.
        Praesent tortor dui, semper in sapien non, pharetra luctus turpis.
      </p>
    </section>
    <section>
      <p>
        Vestibulum at est ex. Aenean id ligula id nibh dictum laoreet. Etiam non semper erat.
        Pellentesque eu justo rhoncus diam vulputate facilisis. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nullam feugiat metus ex, vel fringilla massa tincidunt
        sit amet. Nunc facilisis bibendum tristique. Mauris commodo, dolor vitae dapibus
        fermentum, odio nibh viverra lorem, eu cursus diam turpis et sapien. Nunc suscipit
        tortor a ligula tincidunt, id hendrerit tellus sollicitudin.
      </p>
    </section>
  `;
}
