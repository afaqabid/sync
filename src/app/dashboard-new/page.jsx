"use client";
import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Navbar from '../components/navbar/Navbar';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { authService } from '../auth/authService';
import DashboardNav from '../components/dashboardNav/DashboardNav';
import DashboardComponent from '../components/dashboardComponent/DashboardComponent';
import MyTasks from '../components/myTasks/MyTasks';
import Settings from '../components/settings/Settings';
import Help from '../components/help/Help';

function Dashboard() {
    const [inputText, setInputText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [dataFetched, setDataFetched] = useState(false);
    const [linkIndex, setLinkIndex] = useState(0);

    const router = useRouter();

    // Check for saved session
    useEffect(() => {
        const checkAuth = async () => {
            const sessionUser = await authService.checkSavedSession();
            if (sessionUser) {
                setLoading(false);
            } else {
                router.push('/login');
            }
        };
        checkAuth();
    }, [router]);

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


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
            setDataFetched(true);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated && !loading) {
            getDataFromDB(); // Fetch the tasks when the component is mounted and user is authenticated
        }
    }, [isAuthenticated, loading]);

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
        if (dataFetched) {
            updateTasksInDB();
        }
    }, [tasks, dataFetched]);

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

    const handleClearAll = () => {
        setTasks([]);
    };

    const handleAllCompleted = () => {
        const newTasks = tasks.map((task) => ({ ...task, completed: !task.completed }));
        setTasks(newTasks);
    }



    if (loading) {
        // return <div>Loading...</div>; // Add a loading indicator while checking authentication
        return <div></div>; // Add a loading indicator while checking authentication
    }

    if (!isAuthenticated) {
        return null; // This will prevent the rendering if the user is not authenticated
    }

    const renderComponent = () => {
        if (linkIndex === 0) {
            return <DashboardComponent />;
        }
        else if (linkIndex === 1) {
            return <MyTasks />;
        }
        else if (linkIndex === 2) {
            return <Settings />;
        }
        else if (linkIndex === 3) {
            return <Help />;
        }

    }

    return (
        <div className="main-div">
            {/* <Navbar /> */}
            <div className="center-div">
                <DashboardNav />
                <div className="center-content-div">
                    <div className="left-div">
                        <div className="spacer-div"></div>
                        <div className="left-content-div">
                            <div className="personalData">
                                <img src="/avatar.png" alt="" className='userImg' />
                                <p className="name">Afaq Abid</p>
                                <p className="email">afaqabid@gmail.com</p>
                            </div>
                            <div className="linksDiv">
                                <ul className="linkItems">
                                    <li className={linkIndex === 0 ? "linkItem active" : "linkItem"} onClick={() => setLinkIndex(0)}>Dashboard</li>
                                    <li className={linkIndex === 1 ? "linkItem active" : "linkItem"} onClick={() => setLinkIndex(1)}>My Tasks</li>
                                    <li className={linkIndex === 2 ? "linkItem active" : "linkItem"} onClick={() => setLinkIndex(2)}>Settings</li>
                                    <li className={linkIndex === 3 ? "linkItem active" : "linkItem"} onClick={() => setLinkIndex(3)}>Help</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right-div">
                        {renderComponent()}
                    </div>

                </div>

                {/* <h1>Tasks</h1>
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
                <div className='lower-btns'>
                    <button onClick={handleClearAll}>Clear All</button>
                    <span>|</span>
                    <button onClick={handleAllCompleted}>Mark All Completed</button>
                </div> */}
            </div>
        </div>
    );
}

export default Dashboard;
