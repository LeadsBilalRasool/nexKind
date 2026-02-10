const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: String }, // e.g., "45 min"
});

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Short description for cards
  instructor: { type: String, required: true },
  
  // Course Meta
  rating: { type: Number, default: 0 },
  duration: { type: String, required: true }, // e.g. "8 Weeks"
  totalLectures: { type: Number, default: 0 },
  skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  language: { type: String, default: 'English' },
  price: { type: Number, default: 0 },
  studentsEnrolled: { type: Number, default: 0 }, // Display count
  category: { type: String, required: true }, // Course category

  // Detailed Info
  aboutCourse: { type: String },
  whatYouWillLearn: [{ type: String }],
  
  // Content
  modules: [moduleSchema],

  // Visuals
  image: { type: String }, // URL to course thumbnail
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
