// tslint:disable:no-empty no-unused-expression

import loaderUtils from 'loader-utils';

export default function() {}

export function pitch(this: any, remainingRequest: string) {
  this.cacheable && this.cacheable();

  return `
    const {css} = require('lit-element');
    const content = require(${loaderUtils.stringifyRequest(this, `!!${remainingRequest}`)});
    const str = typeof content === 'string' ? content : content.toString();
    module.exports = css([str]);
  `;
}
