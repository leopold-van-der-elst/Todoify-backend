const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    priority: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;