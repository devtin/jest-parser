<div><h1>jest-parser</h1></div>

<p>
    <a href="https://www.npmjs.com/package/jest-parser" target="_blank"><img src="https://img.shields.io/npm/v/jest-parser.svg" alt="Version"></a>
<a href="http://opensource.org/licenses" target="_blank"><img src="http://img.shields.io/badge/License-MIT-brightgreen.svg"></a>
</p>

<p>
    Parses jest tests into an object
</p>

## Manifesto

Since nothing describes better what a software does than its tests, in order to make easy the documentation process, I
want to be able to parse the content of a jest file. 

Mind this library is RegExp-based. See [disclaimer](#disclaimer) below.

## Installation

```sh
$ npm i jest-parser --save
# or
$ yarn add jest-parser
```

## Features

- [Parses jest syntax](#parses-jest-syntax)


<a name="loads-entities-from-directory"></a>

## Parses jest syntax

Take the following jest file:

```js
describe('Some describe title 1', () => {
    // some code 1
    /* eslint-disable-next-line */
    describe.only('Nested describe 1', () => {
        // some setup
        // some more setup

        it('does this and that', () => {
            // code of what it does
            expect(true).toBeTruthy()
        })
    })
})

describe('Some describe title 2', () => {
    // some code 2
})

describe('Some describe title 3', () => {
    // some code 3
})
```
...and the following script:

```js
const { parse } = require('jest-parser')
const { readFileSync } = require('fs')

console.log(parse('Some jest file', readFileSync('jest-test.js').toString()))
```
would produce the following output:

```json
{
  "title": "Some jest file",
  "describe": [
    {
      "title": "Some describe title 1",
      // entire file code
      "code": "// some code 1\n/* eslint-disable-next-line */\ndescribe.only('Nested describe 1', () => {\n    // some setup\n    // some more setup\n\n    it('does this and that', () => {\n        // code of what it does\n        expect(true).toBeTruthy()\n    })\n})",
      "start": 0,
      "end": 12,
      "describe": [
        {
          "title": "Nested describe 1",
          // piece of code within "Nested describe 1"
          "code": "// some setup\n// some more setup\n\nit('does this and that', () => {\n    // code of what it does\n    expect(true).toBeTruthy()\n})",
          // position where "Nested describe 1" starts in parent's code
          "start": 2,
          // position where "Nested describe 1" ends in parent's code
          "end": 10,
          "flag": "only", // flags the test scenario might have (only, skip, todo...)
          "describe": [],
          "test": [],
          "it": [
            {
              "title": "does this and that",
              "code": "// code of what it does\nexpect(true).toBeTruthy()",
              "start": 3,
              "end": 6,
              "describe": [],
              "test": [],
              "it": []
            }
          ]
        }
      ],
      "test": [],
      "it": []
    },
    {
      "title": "Some describe title 2",
      "code": "// some code 2",
      "start": 14,
      "end": 16,
      "describe": [],
      "test": [],
      "it": []
    },
    {
      "title": "Some describe title 3",
      "code": "// some code 3",
      "start": 18,
      "end": 20,
      "describe": [],
      "test": [],
      "it": []
    }
  ],
  "test": [],
  "it": []
}
```

## Disclaimer 

Mind this library is RegExp-based (not AST-based). That said, it might not work well using funky syntax.

One known scenario it won't work is a oneliner test (see discussion [here](https://github.com/devtin/jest-parser/pull/1)):

```js
// none of this would work
it('one line explicit-return arrow function', () => { return Promise.resolve(true) })
it('one line implicit-return arrow function', () => Promise.resolve(true))
it('multiline implicit-return arrow function', () =>
    Promise.resolve(true)
)
```

* * *

### License

[MIT](https://opensource.org/licenses/MIT)

&copy; 2021-present Martin Rafael Gonzalez <tin@devtin.io>
