const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, default: 'in-progress' },
    dueDate: Date,
    createdBy: String,
    sharedWith: [String],
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
