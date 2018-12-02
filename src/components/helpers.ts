import { LitElement, PropertyDeclaration } from '@polymer/lit-element';

// A property decorator that works with Babel.
// See https://github.com/Polymer/lit-element/issues/205
export function property(options?: PropertyDeclaration<any>):
  (proto: any, name: string) => void {
  return (elementDescriptor) => {
    const name = elementDescriptor.key;
    const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
    return {
      // We are creating an own property and using the original initializer,
      // but changing the key, so foo becomes __foo. The getter and setter
      // methods are created by createProperty().
      ...elementDescriptor,
      key,
      finisher(clazz: typeof LitElement) {
          clazz.createProperty(name, options);
      },
    };
  };
}

// A customElement decorator that works with Babel.
export function customElement(tagName: keyof HTMLElementTagNameMap):
  (proto: any) => void {
  return (elementDescriptor) => ({
    elements: elementDescriptor.elements,
    kind: elementDescriptor.kind,
    finisher(clazz: typeof LitElement) {
      window.customElements.define(tagName, clazz);
    },
  });
}
