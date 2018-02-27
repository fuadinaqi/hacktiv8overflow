'use strict'
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = class Middleware {
  constructor() {

  }

  static authLogin (req, res, next) {
    jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
      if (!err) {
        // console.log(decoded.data);
        req.headers.userId = decoded.data._id
        // console.log(req.headers.userId)
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
