import React, { useState } from 'react';
import './dashboardComponent.css';
import DonutChart from '../DoughnutChart/DoughnutChart';
import TaskCard from '../taskCard/TaskCard';

function DashboardComponent() {

    const [showModal, setShowModal] = useState(false);

    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1', status: 'In Progress', dateCreated: '2024-08-29', imgUrl: 'https://via.placeholder.com/150', priority: 'Extreme', description: 'Task 1 description with a few words' },
        { id: 2, title: 'Task 2', status: 'Not Started', dateCreated: '2024-08-29', imgUrl: 'https://via.placeholder.com/150', priority: 'Moderate', description: 'Another brief task description here' },
        { id: 3, title: 'Task 3', status: 'Completed', dateCreated: '2024-08-29', imgUrl: 'https://via.placeholder.com/150', priority: 'Low', description: 'Task 3 short description' },
        { id: 4, title: 'Task 4', status: 'In Progress', dateCreated: '2024-08-29', imgUrl: 'https://via.placeholder.com/150', priority: 'Extreme', description: 'Brief description for task 4' },
        { id: 5, title: 'Task 5', status: 'Not Started', dateCreated: '2024-08-29', imgUrl: 'https://via.placeholder.com/150', priority: 'Moderate', description: 'Short description of task 5' },
    ]);

    const [completedTasks, setCompletedTasks] = useState([
        { id: 6, title: 'Completed Task 1', status: 'Completed', dateCreated: '2024-08-29', imgUrl: 'https://via.placeholder.com/150', priority: 'Extreme', description: 'Completed task 1 short desc' },
        { id: 7, title: 'Completed Task 2', status: 'Completed', dateCreated: '2024-08-29', imgUrl: 'https://via.placeholder.com/150', priority: 'Moderate', description: 'Completed task 2 brief desc' },
        { id: 8, title: 'Completed Task 3', status: 'Completed', dateCreated: '2024-08-29', imgUrl: 'https://via.placeholder.com/150', priority: 'Low', description: 'Completed task 3 quick desc' },
        { id: 9, title: 'Completed Task 4', status: 'Completed', dateCreated: '2024-08-29', imgUrl: 'https://via.placeholder.com/150', priority: 'Extreme', description: 'Completed task 4 short desc' },
        { id: 10, title: 'Completed Task 5', status: 'Completed', dateCreated: '2024-08-29', imgUrl: 'https://via.placeholder.com/150', priority: 'Moderate', description: 'Completed task 5 brief desc' },
    ]);

    const handleStatusChange = (taskId, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    const data1 = {
        datasets: [
            {
                label: 'Completed',
                data: [3, 8],
                backgroundColor: ['#05A301', '#D9D9D9'], // Green, Grey
                hoverBackgroundColor: ['#05A301', '#D9D9D9'],
                rotation: 180,
                borderWidth: 0,
            },
        ],
    };

    const data2 = {
        datasets: [
            {
                label: 'In Progress',
                data: [4, 8],
                backgroundColor: ['#0225FF', '#D9D9D9'], // Blue, Grey
                hoverBackgroundColor: ['#0225FF', '#D9D9D9'],
                rotation: 180,
                borderWidth: 0,
            },
        ],
    };

    const data3 = {
        datasets: [
            {
                label: 'Not Started',
                data: [1, 8],
                backgroundColor: ['#F21E1E', '#D9D9D9'], // Red, Grey
                hoverBackgroundColor: ['#F21E1E', '#D9D9D9'],
                rotation: 180,
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
    };

    return (
        <div className="main-div-dashboard-component">
            <div className="upper-div-dashboard-component">
                <p className="welcomeText">Welcome back, <span className="first-name">Afaq</span> 👋</p>
            </div>
            <div className="lower-div-dashboard-component">
                <div className="left-lower-div-dashboard-component">
                    <div className="todoBlock">
                        <div className='add-todo-main-div'>
                            <div className='add-todo-div'>
                                <img src="/Pending.png" alt="" className='todo-icon' />
                                <p className='todo-heading'>To-Do</p>
                            </div>
                            <div className='todo-btn-div'>
                                <button className='todo-btn' onClick={() => setShowModal(true)}><span className='todo-Btn-icon'>+</span> Add Task</button>
                            </div>
                        </div>

                        <div className="todo-cards">
                            {tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    title={task.title}
                                    status={task.status}
                                    dateCreated={task.dateCreated}
                                    imgUrl={task.imgUrl}
                                    priority={task.priority}
                                    description={task.description}
                                    onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="right-lower-div-dashboard-component">
                    <div className="task-status-block">
                        <div className='task-status-main-div'>
                            <div className='task-status-div'>
                                <img src="/TaskStatus.png" alt="" className='task-status-icon' />
                                <p className='task-status-heading'>Task Status</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
                                <div style={{ width: '120px', height: '100px', textAlign: 'center' }}>
                                    <DonutChart data={data1} options={options} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <img src="/GreenDot.png" alt="" width="8px" height="8px" style={{ marginTop: "2px" }} />
                                        <p className='completed-graph-heading' style={{ color: '#05A301', fontSize: '18px', fontWeight: 400, marginTop: '5px' }}>Completed</p>
                                    </div>
                                </div>
                                <div style={{ width: '120px', height: '100px', textAlign: 'center' }}>
                                    <DonutChart data={data2} options={options} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <img src="/BlueDot.png" alt="" width="8px" height="8px" style={{ marginTop: "2px" }} />
                                        <p className='inprogress-graph-heading' style={{ color: '#0225FF', fontSize: '18px', fontWeight: 400, marginTop: '5px' }}>In Progress</p>
                                    </div>
                                </div>
                                <div style={{ width: '120px', height: '100px', textAlign: 'center' }}>
                                    <DonutChart data={data3} options={options} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <img src="/RedDot.png" alt="" width="8px" height="8px" style={{ marginTop: "2px" }} />
                                        <p className='notstarted-graph-heading' style={{ color: '#F21E1E', fontSize: '18px', fontWeight: 400, marginTop: '5px' }}>Not Started</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="task-completed-block">
                        <div className="completed-task-main-div">
                            <div className='completed-tasks-div'>
                                <img src="/CompletedTasks.png" alt="" className='completed-tasks-icon' />
                                <p className='completed-tasks-heading'>Completed Tasks</p>
                            </div>
                        </div>
                        <div className="todo-completed-cards">
                            {completedTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    title={task.title}
                                    status={task.status}
                                    dateCreated={task.dateCreated}
                                    imgUrl={task.imgUrl}
                                    priority={task.priority}
                                    description={task.description}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <>
                    <div className={`overlay ${showModal ? 'show' : ''}`} onClick={() => setShowModal(false)}></div>
                    <div className={`add-task-modal ${showModal ? 'show' : ''}`}>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </>
            )}



        </div>
    );
}

export default DashboardComponent;
