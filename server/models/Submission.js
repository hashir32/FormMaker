const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  userId: { type: String, required: true },
  answers: [
    {
      questionName: String, // like "satisfaction-stars"
      selectedOption: Number // like 4
    }
  ],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
