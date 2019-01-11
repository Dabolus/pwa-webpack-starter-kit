import { html } from 'lit-element';
import { MyView404 } from './my-view404.component';

export default function template(this: MyView404) {
  return html`
    <section>
      <h2>Oops! You hit a 404</h2>
      <p>The page you're looking for doesn't seem to exist. Head back
          <a href="/">home</a> and try again?
      </p>
    </section>
  `;
}
