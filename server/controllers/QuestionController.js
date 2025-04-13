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

exports.rateQuestion = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (typeof rating !== 'number') {
    return res.status(400).json({ message: "Rating must be a number." });
  }

  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: "Question not found." });

    question.ratings_metric_one.push(rating);
    await question.save();

    res.status(200).json({
      message: "Rating added successfully.",
      updatedRatings: question.ratings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};