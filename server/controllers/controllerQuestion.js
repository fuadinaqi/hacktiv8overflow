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
      title: req.body.title,
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
          if (findVoter.length > 0) {
            return res.status(500).send({
              msg: 'anda sudah vote'
            })
          }
        }
        question.votes.push(req.headers.userId)
        if (req.body.thumbsUp) {
          question.point++
        } else {
          question.point--
        }
        question.save()
          .then(questionSave => res.status(200).send({
            msg: 'vote succeed',
            questionSave
          }))
          .catch(err => res.status(500).send(err))
      })
      .catch(err => res.status(500).send(err))
  }

  static getById (req, res) {
    Question.find({
      'userId': req.headers.userId
    })
      .then(questions => res.status(200).send({
        msg: 'get question profile succeed',
        questions
      }))
      .catch(err => res.status(500).send(err))
  }

  static edit (req, res) {
    Question.findOneAndUpdate({
      '_id': req.params.id
    }, {
      title: req.body.title,
      question: req.body.question
    })
      .then(isEdit => {
        Question.findOne({
          '_id': req.params.id
        })
          .then(questionEdited => res.status(200).send({
            msg: 'edit success',
            questionEdited
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
