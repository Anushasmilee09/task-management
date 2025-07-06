const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create task
router.post('/', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

// Get all tasks
router.get('/:user', async (req, res) => {
    const tasks = await Task.find({
        $or: [{ createdBy: req.params.user }, { sharedWith: req.params.user }]
    });
    res.json(tasks);
});

// Update task
router.put('/:id', async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// Delete task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;
