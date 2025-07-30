const { normalizeURL, getURLSFromHTML } = require('./crawl.js');
const { test, except, expect } = require('@jest/globals');

test('normalizeURL strip https', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip last slash', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL Capitalize', () => {
  const input = 'https://BLOG.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('getURLSFromHTML absolute', () => {
  const inputHtmlBody = `
  <head>
      <body>
        <a href='https://blog.boot.dev/path/'>
            Boot.dev Blog
        </a>
      </body>
  </head>
  `;

  const inputBaseURL = 'https://blog.boot.dev/path/';
  const actual = getURLSFromHTML(inputHtmlBody, inputBaseURL);
  const expected = ['https://blog.boot.dev/path/'];
  expect(actual).toEqual(expected);
});

test('getURLSFromHTML relative', () => {
  const inputHtmlBody = `
  <head>
      <body>
        <a href='/path/'>
            Boot.dev Blog
        </a>
      </body>
  </head>
  `;

  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLSFromHTML(inputHtmlBody, inputBaseURL);
  const expected = ['https://blog.boot.dev/path/'];
  expect(actual).toEqual(expected);
});

test('getURLSFromHTML Both', () => {
  const inputHtmlBody = `
  <head>
      <body>
        <a href='https://blog.boot.dev/path1'>
            Boot.dev Blog
        </a>
        <a href='/path2'>
            Boot.dev Blog
        </a>
      </body>
  </head>
  `;

  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLSFromHTML(inputHtmlBody, inputBaseURL);
  const expected = [
    'https://blog.boot.dev/path1',
    'https://blog.boot.dev/path2',
  ];
  expect(actual).toEqual(expected);
});

test('getURLSFromHTML invalid', () => {
  const inputHtmlBody = `
  <head>
      <body>
        <a href='invalid'>
            Boot.dev Blog
        </a>
        <a href='invalid'>
            Boot.dev Blog
        </a>
      </body>
  </head>
  `;

  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLSFromHTML(inputHtmlBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
