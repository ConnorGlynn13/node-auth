const express = require('express');
const router = express.Router();

const homeRouterFactory = () => {
  router.get('/', (req, res) => {
    res.render('home', { email: req.session.user.email })
  })

  return router
}

module.exports = homeRouterFactory
