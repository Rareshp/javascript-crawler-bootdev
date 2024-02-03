const { test, expect } = require('@jest/globals');

const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

const expected = 'blog.boot.dev/path'

test('normalizeURL protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  expect(actual).toEqual(expected)
})

test('normalizeURL trailing slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  expect(actual).toEqual(expected)
})

test('normalizeURL capital letters in url', () => {
  const input = 'https://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  expect(actual).toEqual(expected)
})

const inputURL = 'https://blog.boot.dev'

test('getURLsFromHTML absolute', () => {
  const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () => {
  const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
})

