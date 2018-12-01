import { Page } from 'puppeteer';

const appUrl = 'http://127.0.0.1:8080';
jest.setTimeout(30000);

declare global {
  interface Window {
    deepQuerySelector(query: string): void;
  }
}

describe('routing tests', () => {
  it('the page selector switches pages', async () => {
    await page.goto(appUrl);
    await page.waitForSelector('my-app', {visible: true});

    await testNavigation(page, 'view2', 'View Two');
    await testNavigation(page, 'view3', 'View Three');
    await testNavigation(page, 'view1', 'View One');
  });

  it('the page selector switches pages in a different way', async () => {
    await page.goto(`${appUrl}`);
    await page.waitForSelector('my-app', {visible: true});

    // Setup
    await page.evaluate(() => {
      window.deepQuerySelector = (query: string) => {
        const parts = query.split('::shadow');
        let el: HTMLDocument | Element | ShadowRoot = document;
        for (let i = 0; i < parts.length; i++) {
          el = el.querySelector(parts[i]);
          if (i % 2 === 0) {
            el = el.shadowRoot;
          }
        }
        return el === document ? null : el;
      };
    });

    await testNavigationInADifferentWay(page, 'view2', 'View Two');
    await testNavigationInADifferentWay(page, 'view3', 'View Three');
    await testNavigationInADifferentWay(page, 'view1', 'View One');
  });
});

async function testNavigation(page: Page, href: string, linkText: string) {
  // Shadow DOM helpers.
  const getShadowRootChildProp = (el: HTMLElement, childSelector: string, prop: string) => {
    const child: any = el.shadowRoot.querySelector(childSelector);
    return child[prop];
  };
  const doShadowRootClick = (el: HTMLElement, childSelector: string) => {
    const child: HTMLElement = el.shadowRoot.querySelector(childSelector);
    return child.click();
  };

  const selector = `a[href="/${href}"]`;

  // Does the link say the right thing?
  const myApp = await page.$('my-app');
  const myText = await page.evaluate(getShadowRootChildProp, myApp, selector, 'textContent');
  expect(await myText).toBe(linkText);

  // Does the click take you to the right page?
  await page.evaluate(doShadowRootClick, myApp, selector);
  const newUrl = await page.evaluate('window.location.href');
  expect(newUrl).toBe(`${appUrl}/${href}`);
}

async function testNavigationInADifferentWay(page: Page, href: string, linkText: string) {
  const query = `my-app::shadow a[href="/${href}"]`;

  const linkHandle = await page.evaluateHandle((q: string) => window.deepQuerySelector(q), query);
  const text = await page.evaluate((el) => el.textContent, linkHandle);
  expect(text).toBe(linkText);

  await page.evaluate((el) => el.click(), linkHandle);
  const newUrl = await page.evaluate('window.location.href');
  expect(newUrl).toBe(`${appUrl}/${href}`);
}
