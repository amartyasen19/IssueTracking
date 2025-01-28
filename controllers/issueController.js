const fs = require('fs');
const path = require('path');
const Issue = require('../models/Issue');

// Get all issues with pagination support
const getAllIssues = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const issues = await Issue.find()
      .skip((page - 1) * limit)  // Skip items for pagination
      .limit(parseInt(limit));  // Limit the number of issues per page
    const total = await Issue.countDocuments();  // Total number of issues for pagination info

    res.json({ total, page: parseInt(page), limit: parseInt(limit), issues });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues', error });
  }
};

// Create a new issue
const createIssue = async (req, res) => {
  const { location, category, description, severity } = req.body;

  // Check if required fields are provided
  if (!location || !category || !description || !severity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const issue = new Issue({
    ...req.body,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : '',  // Set imageUrl if an image file is uploaded
  });

  try {
    await issue.save();
    res.status(201).json({ message: 'Issue created', issue });
  } catch (error) {
    res.status(500).json({ message: 'Error creating issue', error });
  }
};

// Update an existing issue
const updateIssue = async (req, res) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  try {
    const issue = await Issue.findById(id);

    // Check if an image file is uploaded and handle it
    if (req.file) {
      if (issue.imageUrl) {
        fs.unlinkSync(path.join(__dirname, '..', issue.imageUrl));  // Delete old image if it exists
      }
      updatedData.imageUrl = `/uploads/${req.file.filename}`;  // Set the new imageUrl
    }

    const updatedIssue = await Issue.findByIdAndUpdate(id, updatedData, {
      new: true,  // Return the updated issue object
    });

    res.json({ message: 'Issue updated', updatedIssue});
  } catch (error) {
    res.status(500).json({ message: 'Error updating issue', error });
  }
};

// Delete an issue
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    // Delete the image file if it exists
    if (issue.imageUrl) {
      fs.unlinkSync(path.join(__dirname, '..', issue.imageUrl));
    }

    await Issue.findByIdAndDelete(req.params.id);
    res.json({ message: 'Issue deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting issue', error });
  }
};

module.exports = { getAllIssues, createIssue, updateIssue, deleteIssue };
