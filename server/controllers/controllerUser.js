'use strict'
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = class ControllerUser {
  constructor() {

  }

  static getAll (req, res) {
    User.find()
      .then(users => res.status(200).send({
        msg: 'get all users success',
        users
      }))
      .catch(err => res.status(500).send(err))
  }

  static signin (req, res) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          console.log(user, 'ini user')
          if (user.password === req.body.password) {
            jwt.sign({data: user}, process.env.SECRET_KEY, (err, token) => {
              res.status(200).send({
                msg: 'login success',
                token
              })
            })
          } else {
            res.status(200).send({
              msg: 'password salah'
            })
          }
        } else {
          res.status(500).send({
            msg: 'email blm terdafatar'
          })
        }
      })
      .catch(err => res.status(500).send(err))
  }

  static signup (req, res) {
    User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(userCreate => res.status(200).send({
        msg: 'user create success',
        userCreate
      }))
      .catch(err => res.status(500).send(err))
  }

  static edit (req, res) {
    let objUpdate = {
      ...req.body
    }
    User.findOneAndUpdate({
      '_id': req.params.id
    }, objUpdate)
      .then(userEdit => {
        User.findOne({
          '_id': req.params.id
        })
          .then(user => res.status(200).send({
            msg: 'user edit success',
            user
          }))
          .catch(err => res.status(500).send(err))
      })
      .catch(err => res.status(500).send(err))
  }

  static destroy (req, res) {
    User.remove({
      '_id': req.params.id
    })
      .then(userRemove => res.status(200).send({
        msg: 'delete user success',
        userRemove
      }))
      .catch(err => res.status(500).send(err))
  }
}
