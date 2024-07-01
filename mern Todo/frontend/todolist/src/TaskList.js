import React from 'react';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <Task 
                            key={task._id} 
                            task={task} 
                            updateTask={updateTask} 
                            deleteTask={deleteTask} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
