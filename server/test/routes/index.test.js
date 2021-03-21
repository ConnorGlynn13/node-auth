const request = require('supertest')
const app = require('../../main/app')

const base = '/'
describe('index route', () => {
    describe('get /', () => {
        it('redirects to log in', async () => {
            expect.hasAssertions()
            await request(app)
            .get(`${base}`)
            .expect(302)
            .expect('Content-Type', /text\/plain; charset=utf-8/)
            .then(res => {
                expect(res.text).toStrictEqual('Found. Redirecting to /login')
            })
        })
    })
})