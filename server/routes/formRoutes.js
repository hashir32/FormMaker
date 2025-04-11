const express = require('express');
const router = express.Router();
const {
  createForm,
  getFormById,
  createQuestionCollection // ✅ newly added
} = require('../controllers/formController');

// Existing routes
router.post('/', createForm);
router.get('/:id', getFormById);

// ✅ New route for creating question collection
router.post('/create-question-collection', createQuestionCollection);

module.exports = router;
