declare module '@polymer/polymer/lib/utils/settings' {
  export const useShadow: boolean;
  export const useNativeCSSProperties: boolean;
  export const useNativeCustomElements: boolean;
  export let rootPath: string | undefined;
  export const setRootPath: (path: string | undefined) => void;
  export const setSanitizeDOMValue:
    (newSanitizeDOMValue: ((value: any, name: string, type: string, node: Node) => any) | undefined) => void;
  export let passiveTouchGestures: boolean;
  export const setPassiveTouchGestures: (usePassive: boolean) => void;
}
