import { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";



function Dashboard() {

  const [total, setTotal] = useState({ totalUsers: 0 });
  const [logs,setLogs] = useState({name:"",email:""})
  useEffect(()=>{
    axios.get("http://localhost:3000/api/auth/totals")
    .then(res => setTotal(res.data))
    .catch(err => console.error(err.message))
  },[])

  useEffect(()=>{
    axios.get("http://localhost:3000/api/auth/logs")
    .then(res => setLogs(res.data))
    .catch(err => console.error(err.message))
  },[])

  const [stats] = useState({
    totalCommunities: 0,
    pendingReports: 0
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Overview of platform activity</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-users"></div>
          <div className="stat-content">
            <p className="stat-label">Total Users</p>
            <h2 className="stat-value">{total.totalUsers}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-posts"></div>
          <div className="stat-content">
            <p className="stat-label">Total Posts</p>
            <h2 className="stat-value">{total.totalPosts}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-communities"></div>
          <div className="stat-content">
            <p className="stat-label">Total Communities</p>
            <h2 className="stat-value">{stats.totalCommunities}</h2>
          </div>
        </div>

        <div className="stat-card stat-card-alert">
          <div className="stat-icon stat-icon-reports"></div>
          <div className="stat-content">
            <p className="stat-label">Pending Reports</p>
            <h2 className="stat-value">{stats.pendingReports}</h2>
          </div>
        </div>
      </div>

      <div className="recent-activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-dot"></div>
            <div className="activity-details">
              <p className="activity-text">New user registration: <strong>{logs.name}</strong> (<strong>{logs.email}</strong>)</p>
              <p className="activity-time">2 minutes ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-dot"></div>
            <div className="activity-details">
              <p className="activity-text">Community created: <strong>Tech Enthusiasts</strong></p>
              <p className="activity-time">15 minutes ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-dot activity-dot-alert"></div>
            <div className="activity-details">
              <p className="activity-text">New report submitted for post #2847</p>
              <p className="activity-time">1 hour ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-dot"></div>
            <div className="activity-details">
              <p className="activity-text">Post published: <strong>Alice Smith</strong></p>
              <p className="activity-time">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;