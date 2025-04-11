const Question = require('../models/Question'); // Import the Question model

// Create a new question
exports.createQuestion = async (req, res) => {
  const { questionText } = req.body;

  if (!questionText) {
    return res.status(400).json({ message: "Question text is required." });
  }

  try {
    const newQuestion = new Question({
      questionText: questionText,
      ratings: [] // Empty array for ratings initially
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json({
      message: "Question created successfully.",
      question: savedQuestion
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRandomQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $sample: { size: 5 } }, // randomly pick 5
      {
        $project: {
          _id: 1,
          questionText: 1
        }
      }
    ]);

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};