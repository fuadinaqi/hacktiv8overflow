var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  question: {
    type: String,
    required: true
  },
  votes: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  answers: []
}, {
  timestamps: true
})

module.exports = mongoose.model('Question', questionSchema);
