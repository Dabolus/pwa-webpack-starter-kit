declare module 'pwa-helpers/connect-mixin' {
  import * as r from 'redux';

  export const connect: <S>(store: r.Store<S, r.AnyAction>) => (baseElement: any) => any;
}

declare module 'pwa-helpers/lazy-reducer-enhancer' {
  import * as r from 'redux';

  export interface LazyStore {
    addReducers: (newReducers: r.ReducersMapObject) => void;
  }

  export const lazyReducerEnhancer: (combineReducers: typeof r.combineReducers) => r.StoreEnhancer<LazyStore, {}>;
}

declare module 'pwa-helpers/media-query' {
  export const installMediaQueryWatcher: (mediaQuery: string, layoutChangedCallback: (mediaQueryMatches: boolean) => void) => void;
}

declare module 'pwa-helpers/metadata' {
  export const updateMetadata: (metadata: {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
  }) => void;
}

declare module 'pwa-helpers/network' {
  export const installOfflineWatcher: (offlineUpdatedCallback: (isOffline: boolean) => void) => void;
}

declare module 'pwa-helpers/router' {
  export const installRouter: (locationUpdatedCallback: (location: Location, event: Event | null) => void) => void;
}
