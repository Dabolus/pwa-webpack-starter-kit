// tslint:disable:ordered-imports
import '@skatejs/ssr/register';
import { CounterElement } from '@components/counter-element/counter-element.component';

describe('Counter Element', () => {
  it('tests Web Components!', () => {
    const counterElement = document.createElement('counter-element');
    expect(counterElement).toBeInstanceOf(CounterElement);
  });
});
