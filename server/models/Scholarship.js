const mongoose = require('mongoose');

const scholarshipSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  provider: { type: String, required: true },
  category: { type: String }, // e.g. "Merit-based"
  amount: { type: String, required: true }, // e.g. "$5,000"
  deadline: { type: String, required: true }, // e.g. "May 30, 2026"

  // Detailed Info
  eligibilityCriteria: [{ type: String }],
  requiredDocuments: [{ type: String }],
  
  // Provider Info
  providerLink: { type: String },
  applyLink: { type: String },
  image: { type: String }, // Provider logo or main image of scholarship
  applicantsCount: { type: Number, default: 0 }, // Real-time counter stored in DB
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
