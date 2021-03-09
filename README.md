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
  describe('Nested describe 1', () => {
    it('does this and that', () => {
      // code of what it does
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

console.log(parse('My test file', readFileSync('jest-test.js').toString()))
```
would produce the following output:

```json
{
  "title": "My test file",
  "describe": [
    {
      "title": "Some describe title 1",
      "code": "// some code 1\ndescribe('Nested describe 1', () => {\n    it('does this and that', () => {\n        // code of what it does\n    })\n})",
      "start": 0,
      "end": 7,
      "describe": [
        {
          "title": "Nested describe 1",
          "code": "it('does this and that', () => {\n    // code of what it does\n})",
          "start": 1,
          "end": 5,
          "describe": [],
          "test": [],
          "it": [
            {
              "title": "does this and that",
              "code": "// code of what it does",
              "start": 0,
              "end": 2,
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
      "start": 9,
      "end": 11,
      "describe": [],
      "test": [],
      "it": []
    },
    {
      "title": "Some describe title 3",
      "code": "// some code 3",
      "start": 13,
      "end": 15,
      "describe": [],
      "test": [],
      "it": []
    }
  ],
  "test": [],
  "it": []
}
```

* * *

### License

[MIT](https://opensource.org/licenses/MIT)

&copy; 2021-present Martin Rafael Gonzalez <tin@devtin.io>
