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
  const { rating_1, rating_2, rating_3 } = req.body;

  if (
    typeof rating_1 !== 'number' ||
    typeof rating_2 !== 'number' ||
    typeof rating_3 !== 'number'
  ) {
    return res.status(400).json({ message: "All three ratings must be numbers." });
  }

  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: "Question not found." });

    question.ratings_metric_one.push(rating_1);
    question.ratings_metric_two.push(rating_2);
    question.ratings_metric_three.push(rating_3);

    await question.save();

    res.status(200).json({
      message: "Ratings added successfully.",
      updatedRatings: {
        ratings_metric_one: question.ratings_metric_one,
        ratings_metric_two: question.ratings_metric_two,
        ratings_metric_three: question.ratings_metric_three
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
