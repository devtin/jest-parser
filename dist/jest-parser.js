/*!
 * jest-parser v1.1.0
 * (c) 2021-2022 Martin Rafael Gonzalez <tin@devtin.io>
 * MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @typedef {Object} CodeBlock
 * @property {Number} start - line where it starts
 * @property {Number} end - line where it ends
 */

/**
 * @typedef {Object} It
 * @property {String} title - test title
 * @property {String} code - the containing code un-indented
 * @property {CodeBlock} codeBlock
 */

/**
 * @typedef {Object} HookDescriptor
 * @property {String} title - the function name (if present)
 * @property {CodeBlock} codeBlock - location of the piece of code
 */

/**
 * @typedef {Object} Describe
 * @property {String} title
 * @property {HookDescriptor[]} before
 * @property {HookDescriptor[]} after
 * @property {HookDescriptor[]} beforeEach
 * @property {HookDescriptor[]} afterEach
 * @property {Describe[]} describe
 * @property {It[]} it
 */

const getStringIndent = (str) => {
    const indents = str.split(/\n/g).map((line) => {
        if (!/[^\s]/.test(line)) {
            return undefined // skip empty lines
        }
        return line.match(/^[\s]*/)[0].length
    }).filter(v => v !== undefined).sort((a, b) => a - b);

    return indents[0] || 0
};

const unIndentString = (str) => {
    const indentation = getStringIndent(str);

    return str.split(/\n/g).map((line) => {
        return line.substr(indentation)
    }).join('\n')
};

const getCodeBlockPattern = (fnName) => {
    if (fnName === 'it') {
        return new RegExp(`^${fnName}(?:\\.([a-z]+))?\\((["'\`])(.*?)\\2`, 'gims')
    } else {
        return new RegExp(`^${fnName}(?:\\.([a-z]+))?\\((["'\`])(.*?)\\2[^{]*{[\\n](.*?)[\\n]}\\)`, 'gims')
    }
};

const getFnBlockedContent = (source, fnNames = []) => {
    const results = {};
    const sourceLines = source.split(/\n/g);

    const findLineNumber = (codeLine) => {
        return sourceLines.indexOf(codeLine)
    };

    fnNames.forEach(fnName => {
        results[fnName] = [];
        const pattern = getCodeBlockPattern(fnName);
        let result;
        while ((result = pattern.exec(source))) {
            const [matchedRaw, flag, , title, rawCode = ''] = result;
            const code = unIndentString(rawCode);
            const matchedRawLines = matchedRaw.split(/\n/g);
            const start = findLineNumber(matchedRawLines[0]);
            const end = start !== null ? start + matchedRawLines.length - 1 : null;

            results[fnName].push({
                title,
                code,
                start,
                end,
                flag,
                ...getFnBlockedContent(code, fnNames)
            });
        }
    });

    return results
};

const getDescribe = (jestScript = '') => {
    return getFnBlockedContent(jestScript, [
/*
        'before',
        'after',
        'beforeEach',
        'afterEach',
*/ // maybe these props could be just a reference of line numbers where described
        'describe',
        'test',
        'it'
    ])
};

/**
 * Relies on
 * @param title
 * @param jestContent
 * @returns {{ beforeEach: [], afterEach: [], before: [], after: [], describe: [], it: [], title: string }}
 */
function parse (title, jestContent) {
    return {
        title,
        ...getDescribe(jestContent),
    }
}

exports.parse = parse;
