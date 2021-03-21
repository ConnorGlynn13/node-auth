const express = require('express')
const router = express.Router()

const loginRouterFactory = (dbPool) => {
  router.get('/', (req, res) => {
    res.render('login')
  })

  router.post('/', async (req, res) => {
    const { body } = req
    const { email, password } = body

    const result = await dbPool.query('SELECT * FROM auth_users')

    const foundUser = result.rows.find((user) => {
      return user.email === email && user.password === password
    })

    if (foundUser) {
      req.session.user = { email: foundUser.email }
      res.redirect('/secure/home')
    } else {
      const error = `Username or password is incorrect, please try again`
      res.render('login', { error, email })
    }
  })

  return router
}

module.exports = loginRouterFactory
