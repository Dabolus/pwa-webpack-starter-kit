import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { Page } from 'puppeteer';

const currentDir = `${process.cwd()}/test/integration/screenshots-current`;
const baselineDir = `${process.cwd()}/test/integration/screenshots-baseline`;

const appUrl = 'http://127.0.0.1:8080';
jest.setTimeout(30000);

describe('👀 page screenshots are correct', () => {
  beforeAll(() => {
    // Create the test directory if needed.
    if (!fs.existsSync(currentDir)) {
      fs.mkdirSync(currentDir);
    }
    // And it's subdirectories.
    if (!fs.existsSync(`${currentDir}/wide`)) {
      fs.mkdirSync(`${currentDir}/wide`);
    }
    if (!fs.existsSync(`${currentDir}/narrow`)) {
      fs.mkdirSync(`${currentDir}/narrow`);
    }
  });

  describe('wide screen', () => {
    beforeEach(() => page.setViewport({width: 800, height: 600}));

    it('/', () => takeAndCompareScreenshot(page, '', 'wide'));
    it('/view1', () => takeAndCompareScreenshot(page, 'view1', 'wide'));
    it('/view2', () => takeAndCompareScreenshot(page, 'view2', 'wide'));
    it('/view3', () => takeAndCompareScreenshot(page, 'view3', 'wide'));
    it('/404', () => takeAndCompareScreenshot(page, 'batmanNotAView', 'wide'));
  });

  describe('narrow screen', () => {
    beforeEach(() => page.setViewport({width: 375, height: 667}));

    it('/index.html', () => takeAndCompareScreenshot(page, '', 'narrow'));
    it('/view1', () => takeAndCompareScreenshot(page, 'view1', 'narrow'));
    it('/view2', () => takeAndCompareScreenshot(page, 'view2', 'narrow'));
    it('/view3', () => takeAndCompareScreenshot(page, 'view3', 'narrow'));
    it('/404', () => takeAndCompareScreenshot(page, 'batmanNotAView', 'narrow'));
  });
});

async function takeAndCompareScreenshot(page: Page, route: string, filePrefix: string) {
  // If you didn't specify a file, use the name of the route.
  const fileName = filePrefix + '/' + (route ? route : 'index');

  await page.goto(`${appUrl}/${route}`);
  await page.screenshot({path: `${currentDir}/${fileName}.png`});
  return compareScreenshots(fileName);
}

function compareScreenshots(view: string) {
  return new Promise((resolve, reject) => {
    // Note: for debugging, you can dump the screenshotted img as base64.
    // fs.createReadStream(`${currentDir}/${view}.png`, { encoding: 'base64' })
    //   .on('data', (data) => {
    //     console.log('got data', data)
    //   })
    //   .on('end', () => {
    //     console.log('\n\n')
    //   });
    const img1 = fs.createReadStream(`${currentDir}/${view}.png`)
      .pipe(new PNG())
      .on('parsed', doneReading);
    const img2 = fs.createReadStream(`${baselineDir}/${view}.png`)
      .pipe(new PNG())
      .on('parsed', doneReading);

    let filesRead = 0;
    function doneReading() {
      // Wait until both files are read.
      if (++filesRead < 2) {
        return;
      }

      // The files should be the same size.
      expect(img1.width).toBe(img2.width);
      expect(img1.height).toBe(img2.height);

      // Do the visual diff.
      const diff = new PNG({width: img1.width, height: img1.height});

      // Skip the bottom/rightmost row of pixels, since it seems to be
      // noise on some machines :/
      const width = img1.width - 1;
      const height = img1.height - 1;

      const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height, {
          threshold: 0.2,
        },
      );
      const percentDiff = numDiffPixels / (width * height) * 100;

      const stats = fs.statSync(`${currentDir}/${view}.png`);
      const fileSizeInBytes = stats.size;
      // tslint:disable-next-line:no-console
      console.log(`📸 ${view}.png => ${fileSizeInBytes} bytes, ${percentDiff}% different`);

      // diff.pack().pipe(fs.createWriteStream(`${currentDir}/${view}-diff.png`));
      expect(numDiffPixels).toBe(0);
      resolve();
    }
  });
}
