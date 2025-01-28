const express = require('express');
const multer = require('../middlewares/upload');  // File upload middleware
const {
  getAllIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issueController');

const issueRoutes = express.Router();

// Route definitions
issueRoutes.get('/', getAllIssues);  // Get all issues
issueRoutes.post('/', multer.single('image'), createIssue);  // Create issue with image upload
issueRoutes.put('/:id', multer.single('image'), updateIssue);  // Update issue with image upload
issueRoutes.delete('/:id', deleteIssue);  // Delete issue

module.exports = issueRoutes;
