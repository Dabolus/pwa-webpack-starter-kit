import { menuIcon } from '@components/my-icons';
import { html } from 'lit-element';
import { MyApp } from './my-app.component';

// These are the elements needed by this element.
import '@components/snack-bar/snack-bar.component';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall';
import '@polymer/app-layout/app-toolbar/app-toolbar';

export default function template(this: MyApp) {
  return html`
    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">
          ${menuIcon}
        </button>
        <div main-title>${this.appTitle}</div>
      </app-toolbar>

      <!-- This gets hidden on a small screen-->
      <nav class="toolbar-list">
        <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
        <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
        <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
      </nav>
    </app-header>

    <!-- Drawer content -->
    <app-drawer .opened="${this._drawerOpened}"
        @opened-changed="${this._drawerOpenedChanged}">
      <nav class="drawer-list">
        <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
        <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
        <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
      </nav>
    </app-drawer>

    <!-- Main content -->
    <main role="main" class="main-content">
      <my-view1 class="page" ?active="${this._page === 'view1'}"></my-view1>
      <my-view2 class="page" ?active="${this._page === 'view2'}"></my-view2>
      <my-view3 class="page" ?active="${this._page === 'view3'}"></my-view3>
      <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
    </main>

    <footer>
      <p>Made with &hearts; by the Polymer team.</p>
    </footer>

    <snack-bar ?active="${this._snackbarOpened}">
      You are now ${this._offline ? 'offline' : 'online'}.
    </snack-bar>
  `;
}
