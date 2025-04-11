const express = require('express');
const router = express.Router();
const { createQuestion, getRandomQuestions } = require('../controllers/QuestionController');

// Route to create a question
router.post('/create-question', createQuestion);

// Route to get 5 random questions
router.get('/random', getRandomQuestions);

module.exports = router;
