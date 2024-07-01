import React, { useState } from 'react';
import './TaskList.css';

const Task = ({ task, updateTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateTask(task._id, { title, description, completed: task.completed });
        setIsEditing(false);
    };

    const handleComplete = () => {
        updateTask(task._id, { ...task, completed: !task.completed });
    };

    const handleDelete = () => {
        deleteTask(task._id);
    };

    return (
        <tr>
            <td>
                {isEditing ? (
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                ) : (
                    task.title
                )}
            </td>
            <td>
                {isEditing ? (
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                ) : (
                    task.description
                )}
            </td>
            <td>
                {task.completed ? 'Completed' : 'Incomplete'}
            </td>
            <td className="task-actions">
                {isEditing ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <>
                        <button onClick={handleComplete}>
                            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                        <button onClick={handleEdit}>Edit</button>
                        <button className="delete" onClick={handleDelete}>Delete</button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default Task;
