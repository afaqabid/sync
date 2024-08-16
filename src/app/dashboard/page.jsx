"use client";
import React, { useState } from 'react';
import './dashboard.css';

function Dashboard() {
    const [inputText, setInputText] = useState('');
    const [tasks, setTasks] = useState([{ text: "This is my First Task!", completed: false }]);

    const handleAddNewTask = () => {
        if (inputText.trim() !== '') { 
            setTasks([...tasks, { text: inputText, completed: false }]); 
            setInputText(''); 
        }
    };

    const handleToggleComplete = (index) => {
        const newTasks = tasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <>
            <div className="main-div">
                <nav className="nav-bar">
                    <div className="logo">sync.</div>
                </nav>
                <div className="center-div">
                    <h1>Tasks</h1>
                    <hr />

                    <div className="add-task-div">
                        <input 
                            className='new-task-input' 
                            type="text" 
                            placeholder='Add New Task...' 
                            value={inputText} 
                            onChange={(e) => setInputText(e.target.value)} 
                        />
                        <button className='add-btn' onClick={handleAddNewTask}>Add + </button>
                    </div>

                    <div className="previous-tasks">
                        {tasks.map((task, index) => (
                            <div className="task-item" key={index}>
                                <div className="task-data">
                                    <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                        {task.text}
                                    </p>
                                    <div className="action-btns">
                                        <button onClick={() => handleToggleComplete(index)}>
                                            <img src="/tick.png" alt="Complete" />
                                        </button>
                                        <button onClick={() => handleDeleteTask(index)}>
                                            <img src="/cross.png" alt="Delete" />
                                        </button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
