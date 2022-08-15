describe('Some describe title 1', () => {
    // some code 1
    /* eslint-disable-next-line */
    describe.only('Nested describe 1', () => {
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

it('one line explicit-return arrow function', () => { return Promise.resolve(true) })
it('one line implicit-return arrow function', () => Promise.resolve(true))
it('multiline implicit-return arrow function', () =>
    Promise.resolve(true)
)
