import { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";

function Dashboard() {

  const [total, setTotal] = useState({
    totalUsers: 0,
    totalPosts: 0
  });
  const [logs,setLogs] = useState([]);
  const [peoples, setPeoples] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3000/api/auth/totals")
    .then(res => setTotal(res.data))
    .catch(err => console.error(err.message))
  },[])

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/logs")
      .then(res => {
        setLogs(res.data.logs || []);
      })
      .catch(err => console.error(err.message));
  }, []);

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
          {logs.length === 0 ? (
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-details">
                <button className="activity-empty-btn">
                  No activity yet
                </button>
              </div>
            </div>
          ) : (
            logs.map(log => (
              <div className="activity-item" key={log._id}>
                <div
                  className={`activity-dot ${
                    log.type === "post" ? "" : "activity-dot-users"
                  }`}
                ></div>

                <div className="activity-details">
                  {log.type === "post" && (
                    <>
                      <p className="activity-text">
                        Post uploaded: <strong>{log.name}</strong> ({log.email})
                      </p>
                      <p className="activity-time">
                        {log.createdAt.split("T")[0]}
                      </p>
                    </>
                  )}

                  {log.type === "user" && (
                    <>
                      <p className="activity-text">
                        New user registered: <strong>{log.name}</strong> ({log.email})
                      </p>
                      <p className="activity-time">
                        {log.createdAt.split("T")[0]}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;