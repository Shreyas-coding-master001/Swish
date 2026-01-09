import { useState } from "react";
import "./Communities.css";

function Communities() {
  const [communities] = useState([
    {
      id: 1,
      name: "Tech Enthusiasts",
      description: "A community for technology lovers",
      members: 245,
      status: "Active",
      pendingApproval: false
    },
    {
      id: 2,
      name: "Photography Club",
      description: "Share and discuss photography",
      members: 128,
      status: "Active",
      pendingApproval: false
    },
    {
      id: 3,
      name: "Study Group - CS101",
      description: "Computer Science study group",
      members: 0,
      status: "Pending",
      pendingApproval: true
    },
    {
      id: 4,
      name: "Music Lovers",
      description: "Discuss and share music",
      members: 189,
      status: "Active",
      pendingApproval: false
    },
    {
      id: 5,
      name: "Sports & Fitness",
      description: "Stay fit and active together",
      members: 0,
      status: "Pending",
      pendingApproval: true
    },
    {
      id: 6,
      name: "Book Club",
      description: "Read and discuss books",
      members: 87,
      status: "Disabled",
      pendingApproval: false
    }
  ]);

  const handleApprove = (communityId) => {
    console.log("Approve community:", communityId);
  };

  const handleReject = (communityId) => {
    console.log("Reject community:", communityId);
  };

  const handleDisable = (communityId) => {
    console.log("Disable community:", communityId);
  };

  const handleEnable = (communityId) => {
    console.log("Enable community:", communityId);
  };

  return (
    <div className="communities-container">
      <div className="communities-header">
        <h1 className="communities-title">Communities Management</h1>
        <p className="communities-subtitle">Manage and moderate communities</p>
      </div>

      <div className="communities-list">
        {communities.map((community) => (
          <div key={community.id} className="community-card">
            <div className="community-card-left">
              <div className="community-logo-placeholder">
                {community.name.charAt(0)}
              </div>

              <div className="community-info">
                <div className="community-name-status">
                  <p className="community-name">{community.name}</p>
                  <span
                    className={`community-status-badge ${
                      community.status === "Active"
                        ? "status-active"
                        : community.status === "Pending"
                        ? "status-pending"
                        : "status-disabled"
                    }`}
                  >
                    {community.status}
                  </span>
                </div>
                <p className="community-description">
                  {community.description}
                </p>
                <p className="community-members">
                  {community.members} {community.members === 1 ? "member" : "members"}
                </p>
              </div>
            </div>

            <div className="community-card-right">
              <div className="community-actions">
                {community.pendingApproval ? (
                  <>
                    <button
                      className="community-action-btn btn-approve"
                      onClick={() => handleApprove(community.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="community-action-btn btn-reject"
                      onClick={() => handleReject(community.id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <>
                    {community.status === "Disabled" ? (
                      <button
                        className="community-action-btn btn-enable"
                        onClick={() => handleEnable(community.id)}
                      >
                        Enable
                      </button>
                    ) : (
                      <button
                        className="community-action-btn btn-disable"
                        onClick={() => handleDisable(community.id)}
                      >
                        Disable
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Communities;