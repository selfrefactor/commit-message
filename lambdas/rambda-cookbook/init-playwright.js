import { ms } from 'string-fn';
require('dotenv').config();
import { initPlaywright as initPlaywrightLib } from 'init-playwright';
import {
  SLOW_CONNECTION,
  HEADLESS_TESTING,
  MOBILE_TESTING,
  TEST_BROWSER,
  URL_BASE_STAGING
} from '../constants';
import { setPlaywright } from '../utils/get-playwright';
import { attachToPlaywright } from '../utils/attach-to-playwright';

const TIMEOUT_LIMIT = ms('4 minutes');

/**
 * @param {string}   url - initial address to start Playwright in
 * @return {Promise<{browser: object, page: object, playwright: import("./playwright-interfaces").Playwright}>}
 */
export async function initPlaywright(url, initPlaywrightOptions = {}) {
  const httpAuth = {
    username: process.env.HTTP_AUTH_USER,
    password: process.env.HTTP_AUTH_PASSWORD
  };

  const { browser, page } = await initPlaywrightLib({
    ...initPlaywrightOptions,
    ...(url === URL_BASE_STAGING ? { httpAuth } : {}),
    ...(SLOW_CONNECTION ? { slowNetwork: true } : {}),
    headless: HEADLESS_TESTING,
    logFlag: false,
    url,
    mobile: MOBILE_TESTING,
    browser: TEST_BROWSER,
    waitCondition: {
      timeout: TIMEOUT_LIMIT,
      waitUntil: 'networkidle'
    }
  });
  const playwright = attachToPlaywright(page);

  setPlaywright(playwright, page);
  page.setDefaultTimeout(TIMEOUT_LIMIT);

  return {
    browser,
    page,
    playwright
  };
}
