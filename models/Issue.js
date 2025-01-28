const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
  {
    serialNumber: { type: Number, unique: true, required: true },  // Keep this field as required
    location: { type: String, required: true },  // Required
    category: { type: String, required: true },  // Required
    subcategory: { type: String, required: false },  // Optional
    description: { type: String, required: true },  // Required
    severity: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High', 'Critical'],  // Ensuring valid severity levels
    },
    imageUrl: { type: String, required: false },  // Optional
    referenceCode1: { type: String, required: false },  // Optional
    referenceCode2: { type: String, required: false },  // Optional
  },
  { timestamps: true }
);

// Automatically assign the next serialNumber before saving
issueSchema.pre('save', async function (next) {
  if (!this.serialNumber) {
    const maxIssue = await mongoose
      .model('Issue')
      .findOne()
      .sort('-serialNumber')
      .select('serialNumber');
    this.serialNumber = maxIssue ? maxIssue.serialNumber + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Issue', issueSchema);
