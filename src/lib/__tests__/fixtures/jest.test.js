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
