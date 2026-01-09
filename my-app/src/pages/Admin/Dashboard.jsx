import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [stats] = useState({
    totalUsers: 1247,
    totalPosts: 3856,
    totalCommunities: 42,
    pendingReports: 18
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
            <h2 className="stat-value">{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-posts"></div>
          <div className="stat-content">
            <p className="stat-label">Total Posts</p>
            <h2 className="stat-value">{stats.totalPosts}</h2>
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
              <p className="activity-text">New user registration: <strong>John Doe</strong></p>
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