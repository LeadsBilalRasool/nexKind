const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  
  // Job Overview
  type: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'], default: 'Full-time' },
  salary: { type: String }, // e.g. "$20 - $25 / hr"
  experience: { type: String }, // e.g. "Entry Level"

  // Detailed Info
  responsibilities: [{ type: String }],
  requirements: [{ type: String }],
  benefits: [{ type: String }],

  // Company Info
  companyLink: { type: String },
  applyLink: { type: String },
  image: { type: String }, // Company Logo URL
  applicantsCount: { type: Number, default: 0 }, // Real-time counter stored in DB
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
