// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://gowtham:Aw98AD4spZjKnt8N@cluster0.0lmcrpo.mongodb.net/Todoapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Task schema and model
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// Add a new task
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description, completed: false });
    await task.save();
    res.json(task);
});

// Retrieve all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const task = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});