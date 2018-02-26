'use strict'
const Question = require('../models/Question')
const Answer = require('../models/Answer')

module.exports = class ControllerQuestion {
  constructor() {

  }

  static getAll (req, res) {
    Question.find()
    .populate('userId')
      .then(questions => {
        Answer.find()
        .populate('userId')
          .then(answers => {
            let arrQuestions = []
            questions.forEach(q => {
              let arrAnswers = []
              answers.forEach(a => {
                if (JSON.stringify(q._id) == JSON.stringify(a.questionId)) {
                  arrAnswers.push(a)
                }
              })
              q.answers = arrAnswers
            })
            res.status(200).send({
              msg: 'got data questions',
              questions
            })
          })
          .catch(err => res.status(500).send({
            msg: 'error bang',
            err
          }))
      })
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
