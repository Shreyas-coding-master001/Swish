import { useState } from "react";
import "./Users.css";

function Users() {
  const [selectedRole, setSelectedRole] = useState("");
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      tag: "johndoe",
      role: "Student",
      college: "MIT",
      status: "Active",
      profileImage: null
    },
    {
      id: 2,
      name: "Alice Smith",
      tag: "alicesmith",
      role: "Faculty",
      college: "Stanford",
      status: "Active",
      profileImage: null
    },
    {
      id: 3,
      name: "Bob Johnson",
      tag: "bobjohnson",
      role: "Student",
      college: "Harvard",
      status: "Blocked",
      profileImage: null
    },
    {
      id: 4,
      name: "Emma Wilson",
      tag: "emmawilson",
      role: "Alumni",
      college: "Yale",
      status: "Active",
      profileImage: null
    },
    {
      id: 5,
      name: "Mike Brown",
      tag: "mikebrown",
      role: "Student",
      college: "MIT",
      status: "Active",
      profileImage: null
    },
    {
      id: 6,
      name: "Sarah Davis",
      tag: "sarahdavis",
      role: "Faculty",
      college: "Princeton",
      status: "Active",
      profileImage: null
    }
  ]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleViewProfile = (userId) => {
    console.log("View profile:", userId);
  };

  const handleChangeRole = (userId) => {
    console.log("Change role:", userId);
  };

  const handleToggleBlock = (userId, currentStatus) => {
    console.log("Toggle block:", userId, currentStatus);
  };

  const filteredUsers = selectedRole
    ? users.filter((user) => user.role === selectedRole)
    : users;

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="users-title-section">
          <h1 className="users-title">Users Management</h1>
          <p className="users-subtitle">Manage user accounts and permissions</p>
        </div>

        <div className="users-filter">
          <label className="filter-label">Filter by role:</label>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="filter-select"
          >
            <option value="">All Roles</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>
      </div>

      <div className="users-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-card-left">
              <div className="user-profile-image">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} />
                ) : (
                  <div className="user-profile-placeholder">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-tag">@{user.tag}</p>
                <p className="user-college">{user.college}</p>
              </div>
            </div>

            <div className="user-card-right">
              <div className="user-badges">
                <span className="user-role-badge">{user.role}</span>
                <span
                  className={`user-status-badge ${
                    user.status === "Active"
                      ? "status-active"
                      : "status-blocked"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              <div className="user-actions">
                <button
                  className="user-action-btn btn-view"
                  onClick={() => handleViewProfile(user.id)}
                >
                  View Profile
                </button>
                <button
                  className="user-action-btn btn-role"
                  onClick={() => handleChangeRole(user.id)}
                >
                  Change Role
                </button>
                <button
                  className={`user-action-btn ${
                    user.status === "Active" ? "btn-block" : "btn-unblock"
                  }`}
                  onClick={() => handleToggleBlock(user.id, user.status)}
                >
                  {user.status === "Active" ? "Block" : "Unblock"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;