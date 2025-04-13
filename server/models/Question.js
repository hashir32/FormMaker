const mongoose = require('mongoose');

// Define the schema for a Question
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  ratings_metric_one: { type: [Number], default: [] }, // Empty array for ratings initially
  ratings_metric_two: { type: [Number], default: [] },
  ratings_metric_three: { type: [Number], default: [] } 
});

module.exports = mongoose.model('Question', questionSchema); // Save as 'Question'
