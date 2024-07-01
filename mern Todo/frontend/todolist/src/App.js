// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:3001/tasks');
        setTasks(response.data);
    };

    const addTask = async (task) => {
        const response = await axios.post('http://localhost:3001/tasks', task);
        setTasks([...tasks, response.data]);
    };

    const updateTask = async (id, updatedTask) => {
        const response = await axios.put(`http://localhost:3001/tasks/${id}`, updatedTask);
        setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:3001/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
    );
};

export default App;
