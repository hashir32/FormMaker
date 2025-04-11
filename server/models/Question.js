const mongoose = require('mongoose');

// Define the schema for a Question
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  ratings: { type: [Number], default: [] } // Empty array for ratings initially
});

module.exports = mongoose.model('Question', questionSchema); // Save as 'Question'
