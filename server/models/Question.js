var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  votes: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  answers: [],
  point: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Question', questionSchema);
