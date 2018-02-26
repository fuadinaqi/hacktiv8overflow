var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  questionId: {
    type: Schema.Types.ObjectId, ref: 'Question'
  },
  answer: {
    type: String,
    required: true
  },
  votes: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Answer', answerSchema);
