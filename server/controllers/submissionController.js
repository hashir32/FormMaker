const Submission = require('../models/Submission');

// Submit form answers
exports.createSubmission = async (req, res) => {
  try {
    const submission = new Submission(req.body);
    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all submissions for a form
exports.getSubmissionsByFormId = async (req, res) => {
  try {
    const submissions = await Submission.find({ form: req.params.formId });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
