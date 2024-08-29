import React from 'react'
import './dashboardNav.css'

function DashboardNav() {
    return (
        <div className='mainBar'>
            <div className="left">
                <p>Dash<span>board</span></p>
            </div>
            <div className="center">
                <div className="inputDiv">
                    <input type="text" className="searchInput" placeholder='Search your task here...' />
                    <button className="searchBtn">
                        <img src="/Search.png" alt="" />
                    </button>
                </div>
            </div>
            <div className="right">
                <button className="notificationBtn">
                    <img src="/Notifications.png" alt="" />
                </button>
                <button className="calenderBtn">
                    <img src="/Calender.png" alt="" />
                </button>
                <div className="dateDiv">
                    <p className="day">Thursday</p>
                    <p className="date">29/08/2024</p>
                </div>
            </div>

        </div>
    )
}

export default DashboardNav