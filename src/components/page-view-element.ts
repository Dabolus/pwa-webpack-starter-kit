import { LitElement, property } from 'lit-element';

export class PageViewElement extends LitElement {
  @property({type: Boolean})
  protected active = false;

  // Only render this page if it's actually visible.
  protected shouldUpdate() {
    return this.active;
  }
}
