"use client";
import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Navbar from '../components/navbar/Navbar';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

function Dashboard() {
    const [inputText, setInputText] = useState('');
    const [tasks, setTasks] = useState([]);

    const router = useRouter();

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user || !user.uid) {
        console.error("User is not logged in or UID is missing.");
        router.push('/login');

        return null; // Or handle this case appropriately in your app.
    }

    // Function to fetch data from Firestore
    const getDataFromDB = async () => {
        try {
            const docRef = doc(db, "userTasks", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setTasks(data.tasks || []); // Set the tasks from Firestore
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        getDataFromDB(); // Fetch the tasks when the component is mounted
    }, []);

    const updateTasksInDB = async () => {
        try {
            await updateDoc(doc(db, 'userTasks', user.uid), {
                tasks: tasks,
            });
        } catch (error) {
            console.error("Error updating tasks in the database:", error);
        }
    };

    useEffect(() => {
        if (tasks.length > 0) {
            updateTasksInDB();
        }
    }, [tasks]);

    const handleAddNewTask = () => {
        if (inputText.trim() !== '') {
            setTasks([...tasks, { text: inputText, completed: false, time: Date.now() }]);
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
        <div className="main-div">
            <Navbar />
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

                {tasks.length > 0 ? (
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
                ) : (
                    <p>No tasks available.</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
