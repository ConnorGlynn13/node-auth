const express = require('express')
const router = express.Router()

const registerRouterFactory = (dbPool) => {
  router.get('/', (req, res) => {
    res.render('register')
  })

  router.post('/', async (req, res) => {
    const { body } = req
    const { email, password } = body

    try {
      await dbPool.query(`
      INSERT INTO auth_users (
        email,
        password
      ) VALUES (
        $1,
        $2
      )`,
        [email, password]
      )
      res.redirect('login')
    } catch (e) {
      const error = 'email already exists'
      res.render('register', {error})
    }

  })

  return router
}

module.exports = registerRouterFactory
