const Form = require('../models/Form');
const mongoose = require('mongoose');

// Create a new form
exports.createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a form by ID
exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create a new collection for a question
exports.createQuestionCollection = async (req, res) => {
  const { questionText } = req.body;

  if (!questionText) {
    return res.status(400).json({ message: "Question text is required." });
  }

  try {
    const collectionName = `question_${new Date().getTime()}`;

    const responseSchema = new mongoose.Schema({
      response: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now }
    });

    const ResponseModel = mongoose.model(collectionName, responseSchema);

    await new ResponseModel({ response: 0 }).save(); // dummy doc to create collection

    res.status(201).json({
      message: "Question collection created successfully.",
      collectionName
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
