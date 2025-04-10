const express = require('express');
const router = express.Router();
const {
  createSubmission,
  getSubmissionsByFormId
} = require('../controllers/submissionController');

router.post('/', createSubmission);
router.get('/:formId', getSubmissionsByFormId);

module.exports = router;
