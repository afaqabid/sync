"use client"
import React, { useEffect, useState } from 'react'
import './dashboard.css'

function Dashboard() {
    const [inputText, setInputText] = useState('');
    const [tasks, setTasks] = useState(Array(1).fill("This is my First Task!"));

    const handleAddNewTask = () => {
        if (inputText.trim() !== '') { 
            setTasks([...tasks, inputText]); 
            setInputText(''); 
        }
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
                        <input className='new-task-input' type="text" name="" id="" placeholder='Add New Task....' value={inputText} onChange={(e)=>setInputText(e.target.value)} />
                        <button className='add-btn' onClick={handleAddNewTask}>Add + </button>
                    </div>

                    <div className="previous-tasks">
                    {tasks.map((task, index) => (
                <div className="task-item" key={index}>
                    <div className="task-data">
                        <p>{task}</p>
                        <div className="action-btns">
                            <button>
                                <img src="/tick.png" alt="Complete" />
                            </button>
                            <button>
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