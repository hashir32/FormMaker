const express = require('express');
const router = express.Router();
const { createQuestion, getRandomQuestions, rateQuestion } = require('../controllers/QuestionController');

// Create a question
router.post('/create-question', createQuestion);

// Get 5 random questions
router.get('/random', getRandomQuestions);

// Add a rating to a question
router.patch('/rate-question/:id', rateQuestion);

module.exports = router;
