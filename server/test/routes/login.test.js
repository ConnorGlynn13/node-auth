const request = require('supertest')
const app = require('../../main/app')

const base = '/login'
describe('login route', () => {
    describe('get /', () => {
        it('loads basic template', async () => {
            expect.hasAssertions()
            await request(app)
            .get(`${base}`)
            .expect(200)
            .expect('Content-Type', /html/)
            .then(res => {
                expect(res.text).toContain('Login')
                expect(res.text).toContain('Email')
                expect(res.text).toContain('Password')
                expect(res.text).toContain('Submit')
                expect(res.text).toContain('<a href="/register">or register here</a>')
            })
        })
    })
})