'use strict'
const Question = require('../models/Question')

module.exports = class ControllerQuestion {
  constructor() {

  }

  static getAll (req, res) {
    Question.find()
    .populate()
      .then(questions => res.status(200).send({
        msg: 'get all question success',
        questions
      }))
      .catch(err => res.status(500).send(err))
  }

  static create (req, res) {
    Question.create({
      question: req.body.question,
      userId: req.headers.userId
    })
      .then(questionCreate => res.status(200).send({
        msg: 'question success to create',
        questionCreate
      }))
      .catch(err => res.status(500).send(err))
  }

  static vote (req, res) {
    Question.findOne({
      '_id': req.params.id
    })
      .then(question => {
        if (question.votes.length > 0) {
          let findVoter = question.votes.filter(q => {
            return q == req.headers.userId
          })
          if (findVoter) {
            return res.status(500).send({
              msg: 'anda sudah vote'
            })
          }
        }
        question.votes.push(req.headers.userId)
        question.save()
          .then(questionSave => res.status(200).send({
            msg: 'vote succeed',
            questionSave
          }))
          .catch(err => res.status(500).send(err))
      })
      .catch(err => res.status(500).send(err))
  }

  static destroy (req, res) {
    Question.remove({
      '_id': req.params.id
    })
      .then(questionRemove => res.status(200).send({
        msg: 'question have been removed',
        questionRemove
      }))
      .catch(err => res.status(500).send(err))
  }
};
