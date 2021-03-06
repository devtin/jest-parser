'use strict';

module.exports = {
    testMatch: ['<rootDir>/src/lib/__tests__/**/*.spec.js'],
    testEnvironment: 'node',
    verbose: false,
    collectCoverage: false,
    collectCoverageFrom: [
        'src/**/*.js',
        '!**/node_modules/**',
    ],
    coverageReporters: ['html', 'text', 'text-summary'],
    coverageDirectory: './coverage',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    transform: {
        '\\.m?jsx?$': 'jest-esm-transformer'
    }
};
