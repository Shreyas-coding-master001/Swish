import { useState } from "react";
import "./Reports.css";

function Reports() {
  const [activeTab, setActiveTab] = useState("posts");

  const [postReports] = useState([
    {
      id: 1,
      reporterName: "John Doe",
      reporterTag: "johndoe",
      reason: "Spam",
      contentAuthor: "Mike Brown",
      contentPreview: "Check out this amazing product...",
      date: "2 hours ago",
      status: "Pending"
    },
    {
      id: 2,
      reporterName: "Alice Smith",
      reporterTag: "alicesmith",
      reason: "Inappropriate content",
      contentAuthor: "Bob Johnson",
      contentPreview: "This post contains offensive language...",
      date: "5 hours ago",
      status: "Pending"
    },
    {
      id: 3,
      reporterName: "Emma Wilson",
      reporterTag: "emmawilson",
      reason: "Misinformation",
      contentAuthor: "Sarah Davis",
      contentPreview: "False information about campus events...",
      date: "1 day ago",
      status: "Resolved"
    }
  ]);

  const [userReports] = useState([
    {
      id: 1,
      reporterName: "Sarah Davis",
      reporterTag: "sarahdavis",
      reason: "Harassment",
      reportedUser: "Unknown User",
      reportedUserTag: "unknownuser",
      date: "3 hours ago",
      status: "Pending"
    },
    {
      id: 2,
      reporterName: "Mike Brown",
      reporterTag: "mikebrown",
      reason: "Impersonation",
      reportedUser: "Fake Account",
      reportedUserTag: "fakeaccount",
      date: "1 day ago",
      status: "Pending"
    }
  ]);

  const handleIgnore = (reportId) => {
    console.log("Ignore report:", reportId);
  };

  const handleRemoveContent = (reportId) => {
    console.log("Remove content:", reportId);
  };

  const handleWarnUser = (reportId) => {
    console.log("Warn user:", reportId);
  };

  const handleBlockUser = (reportId) => {
    console.log("Block user:", reportId);
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1 className="reports-title">Reports Management</h1>
        <p className="reports-subtitle">Review and resolve reported content</p>
      </div>

      <div className="reports-tabs">
        <button
          className={`reports-tab ${activeTab === "posts" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          Post Reports
        </button>
        <button
          className={`reports-tab ${activeTab === "users" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          User Reports
        </button>
      </div>

      {activeTab === "posts" && (
        <div className="reports-list">
          {postReports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-card-header">
                <div className="report-info-section">
                  <div className="reporter-info">
                    <p className="report-label">Reported by:</p>
                    <p className="reporter-name">
                      {report.reporterName} <span className="reporter-tag">@{report.reporterTag}</span>
                    </p>
                  </div>
                  <div className="report-reason">
                    <p className="report-label">Reason:</p>
                    <span className="reason-badge">{report.reason}</span>
                  </div>
                </div>
                <span
                  className={`report-status-badge ${
                    report.status === "Pending"
                      ? "status-pending"
                      : "status-resolved"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <div className="report-card-content">
                <p className="content-author-label">Content by: <strong>{report.contentAuthor}</strong></p>
                <div className="content-preview">
                  <p>{report.contentPreview}</p>
                </div>
                <p className="report-date">{report.date}</p>
              </div>

              {report.status === "Pending" && (
                <div className="report-card-actions">
                  <button
                    className="report-action-btn btn-ignore"
                    onClick={() => handleIgnore(report.id)}
                  >
                    Ignore
                  </button>
                  <button
                    className="report-action-btn btn-remove"
                    onClick={() => handleRemoveContent(report.id)}
                  >
                    Remove Content
                  </button>
                  <button
                    className="report-action-btn btn-warn"
                    onClick={() => handleWarnUser(report.id)}
                  >
                    Warn User
                  </button>
                  <button
                    className="report-action-btn btn-block"
                    onClick={() => handleBlockUser(report.id)}
                  >
                    Block User
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "users" && (
        <div className="reports-list">
          {userReports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-card-header">
                <div className="report-info-section">
                  <div className="reporter-info">
                    <p className="report-label">Reported by:</p>
                    <p className="reporter-name">
                      {report.reporterName} <span className="reporter-tag">@{report.reporterTag}</span>
                    </p>
                  </div>
                  <div className="report-reason">
                    <p className="report-label">Reason:</p>
                    <span className="reason-badge">{report.reason}</span>
                  </div>
                </div>
                <span
                  className={`report-status-badge ${
                    report.status === "Pending"
                      ? "status-pending"
                      : "status-resolved"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <div className="report-card-content">
                <p className="content-author-label">
                  Reported user: <strong>{report.reportedUser}</strong> <span className="reporter-tag">@{report.reportedUserTag}</span>
                </p>
                <p className="report-date">{report.date}</p>
              </div>

              {report.status === "Pending" && (
                <div className="report-card-actions">
                  <button
                    className="report-action-btn btn-ignore"
                    onClick={() => handleIgnore(report.id)}
                  >
                    Ignore
                  </button>
                  <button
                    className="report-action-btn btn-warn"
                    onClick={() => handleWarnUser(report.id)}
                  >
                    Warn User
                  </button>
                  <button
                    className="report-action-btn btn-block"
                    onClick={() => handleBlockUser(report.id)}
                  >
                    Block User
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reports;