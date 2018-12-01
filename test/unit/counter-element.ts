// tslint:disable:ordered-imports
import '@skatejs/ssr/register';
import { CounterElement } from '@components/counter-element/counter-element.component';
// Axe seems broken with undom. Going to replace undom with jsdom as soon as it
// gets support for Web Components. See https://github.com/jsdom/jsdom/issues/1030
// import { axe, toHaveNoViolations } from 'jest-axe';
// import render from '@skatejs/ssr';

// expect.extend(toHaveNoViolations);

describe('counter-element tests', () => {
  const el: CounterElement = document.createElement<any>('counter-element');

  beforeAll(() => el.updateComplete);

  it('starts empty', () => {
    expect(el.clicks).toBe(0);
    expect(el.value).toBe(0);
  });

  it('clicking on plus increments', () => {
    expect(el.clicks).toBe(0);
    expect(el.value).toBe(0);

    const buttons = el.shadowRoot.querySelectorAll('button');
    buttons[0].click();

    expect(el.clicks).toBe(1);
    expect(el.value).toBe(1);
  });

  it('clicking on minus decrements', () => {
    expect(el.clicks).toBe(0);
    expect(el.value).toBe(0);

    const buttons = el.shadowRoot.querySelectorAll('button');
    buttons[1].click();

    expect(el.clicks).toBe(1);
    expect(el.value).toBe(-1);
  });

  /* it('a11y', async () => {
    const html = render(el);
    const results = await axe(html);
    expect(results).toHaveNoViolations();
  }); */
});
