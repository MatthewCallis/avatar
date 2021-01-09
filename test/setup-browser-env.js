// @ts-nocheck
const JSDOM = require('jsdom');

const jsdom = new JSDOM.JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://sfc.fm/',
  referrer: 'http://sfc.fm/',
  contentType: 'text/html',
  includeNodeLocations: true,
  storageQuota: 10000000,
});
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  appCodeName: 'Mozilla',
  appName: 'Netscape',
  appVersion: '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.60 Safari/537.36',
  cookieEnabled: true,
  deviceMemory: 8,
  doNotTrack: '1',
  hardwareConcurrency: 16,
  language: 'en-US',
  languages: ['en-US', 'en'],
  maxTouchPoints: 0,
  onLine: true,
  platform: 'MacIntel',
  product: 'Gecko',
  productSub: '20030107',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.60 Safari/537.36',
  vendor: 'Google Inc.',
  vendorSub: '',
};

/**
 * @param  {string} event - Event Label
 * @param {object} params - Event Meta Data
 * @returns {object} The event
 */
function CustomEvent(event, params) {
  params = params || { bubbles: false, cancelable: false, detail: null };
  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}
global.CustomEvent = CustomEvent;

const props = Object.getOwnPropertyNames(window)
  .filter((property) => typeof global[property] === 'undefined')
  .map((property) => Object.getOwnPropertyDescriptor(window, property));
Object.defineProperties(global, props);

// Polyfill JSDOM: https://github.com/jsdom/jsdom/issues/1695
window.HTMLElement.prototype.scrollIntoView = () => {};
window.open = () => {};
window.screen.orientation = {
  angle: 0,
  type: 'landscape-primary',
};
