import { readFileSync } from 'fs'
import path from 'path'
import {
    parse,
    getStringIndent,
    unIndentString,
    getFnBlockedContent
} from '../parse'

const jestFileFixture = readFileSync(path.join(__dirname, './fixtures/jest.test.js')).toString()

describe('getStringIndent()', () => {
    it('returns the minimum amount of indentation found in given text', () => {
        const indent = getStringIndent(`  abc\n    123\n  do re mi`)
        expect(indent).toEqual(2)
    })
})

describe('unIndentString()', () => {
    it('removes the minimum amount of indentation found in given text', () => {
        const unIndented = unIndentString(`  abc\n    123\n  do re mi`)
        expect(unIndented).toEqual(`abc\n  123\ndo re mi`)
    })
})

describe('getFnBlockedContent()', () => {
    it('retrieves metadata about a particular set of describe functions', () => {
        const parsedTree = getFnBlockedContent(jestFileFixture, ['describe', 'it'])
        expect(parsedTree).toMatchSnapshot()
    })
})

describe('parse()', () => {
    it('retrieves metadata about a jest source', () => {
        const parsedTree = parse('Some jest file', jestFileFixture)
        expect(parsedTree).toMatchSnapshot()
    })
})
