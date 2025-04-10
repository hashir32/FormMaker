const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: String,
  pages: [
    {
      name: String,
      elements: [
        {
          type: { type: String, enum: ['rating'] },
          name: String,
          title: String,
          description: String,
          rateType: String,
          rateCount: Number,
          rateValues: [Number],
          scaleColorMode: String,
          displayMode: String
        }
      ]
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Form', formSchema);
