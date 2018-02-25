'use strict'
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = class Middleware {
  constructor() {

  }

  static authLogin (req, res, next) {
    jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
      if (!err) {
        req.headers.userId = decoded.data._id
        next()
      } else {
        res.status(403).send({
          msg: 'forbidden access',
          err
        })
      }
    })
  }
};
