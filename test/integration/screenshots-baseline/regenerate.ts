import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
const baselineDir = `${process.cwd()}/test/integration/screenshots-baseline`;

describe('🎁 regenerate screenshots', () => {
  beforeAll(() => {
    // Create the test directory if needed.
    if (!fs.existsSync(baselineDir)) {
      fs.mkdirSync(baselineDir);
    }
    // And it's subdirectories.
    if (!fs.existsSync(`${baselineDir}/wide`)) {
      fs.mkdirSync(`${baselineDir}/wide`);
    }
    if (!fs.existsSync(`${baselineDir}/narrow`)) {
      fs.mkdirSync(`${baselineDir}/narrow`);
    }
  });

  it('did it', () => generateBaselineScreenshots(page));
});

async function generateBaselineScreenshots(page) {
  const breakpoints = [
      {width: 800, height: 600},
      {width: 375, height: 667}];
  const prefixes = ['wide', 'narrow'];

  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    console.log(prefix + '...'); // tslint:disable-line:no-console
    page.setViewport(breakpoints[i]);
    // Index.
    await page.goto('http://127.0.0.1:4444/');
    await page.screenshot({path: `${baselineDir}/${prefix}/index.png`});
    // Views.
    for (let j = 1; j <= 3; j++) {
      await page.goto(`http://127.0.0.1:4444/view${j}`);
      await page.screenshot({path: `${baselineDir}/${prefix}/view${j}.png`});
    }
    // 404.
    await page.goto('http://127.0.0.1:4444/batmanNotAView');
    await page.screenshot({path: `${baselineDir}/${prefix}/batmanNotAView.png`});
  }
}
