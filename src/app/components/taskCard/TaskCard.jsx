import { useEffect, useState } from "react";
import './taskCard.css'

const TaskCard = ({ title, status, dateCreated, imgUrl, priority, description, onStatusChange }) => {
    const [circle, setCircle] = useState('');
    const [color, setColor] = useState('');
    const [priorityColor, setPriorityColor] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (status === 'In Progress') {
            setCircle('/BlueCircle.png');
            setColor('#0225FF');
        } else if (status === 'Completed') {
            setCircle('/GreenCircle.png');
            setColor('#05A301');
        } else if (status === 'Not Started') {
            setCircle('/RedCircle.png');
            setColor('#F21E1E');
        }
    }, [status]);

    useEffect(() => {
        if (priority === 'Extreme') {
            setPriorityColor('#F21E1E');
        } else if (priority === 'Moderate') {
            setPriorityColor('#3ABEFF');
        } else if (priority === 'Low') {
            setPriorityColor('#05A301');
        }
    }, [priority]);

    const handleMarkAsCompleted = () => {
        if (onStatusChange) {
            onStatusChange('Completed');
        }
        setShow(false);
    };

    return (
        <div className="mainCardBody">
            <img src={circle} alt="" className="status-circle-img" />
            <button className='options-btn' onClick={() => setShow(true)}>
                <img src="/MENU.png" alt="" className="menu-img" />
            </button>
            <div className="upper-card-body">
                <div className="left-upper-card-body">
                    <p className="card-title">{title}</p>
                    <p className="card-description">{description}</p>
                </div>
                <div className="right-upper-card-body">
                    <img className='img-right-upper-card-body' src="/avatar.png" alt="" />
                </div>
            </div>
            <div className="lower-card-body">
                <div className="priority-div">
                    <p className="priority">Priority: <span style={{ color: priorityColor }}>{priority}</span></p>
                </div>
                <div className="status-div">
                    <p className="status">Status: <span style={{ color: color }}>{status}</span></p>
                </div>
                <div className="date-div">
                    <p className="date-created" style={{ color: 'grey' }}>Created on: <span>{dateCreated}</span></p>
                </div>
            </div>
            {show ?
                <div className="menu-div">
                    <ul className="menu-links">
                        {status != 'Completed' ? <li className="link-item" onClick={handleMarkAsCompleted}>Edit</li> : <></>}
                        <li className="link-item">Delete</li>
                        {status != 'Completed' ? <li className="link-item" onClick={handleMarkAsCompleted}>Mark as completed</li> : <></>}
                        <hr />
                        <li className="link-item close" onClick={() => setShow(false)}>Close</li>
                    </ul>
                </div>
                : null
            }
        </div>
    );
};

export default TaskCard;
