import { useState, useEffect } from "react";
import "./Users.css";
import axios from "axios";
import ProfileCard from "../../Components/ProfileCard";

function Users() {
  const [selectedRole, setSelectedRole] = useState("");
  const [users,setUsers] = useState([])
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => { 
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/users"
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(function(){
    axios.get("http://localhost:3000/DisplayPost")
    .then(res => setPosts(res.data))
    .catch(err => console.error(err.message));
  },[]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
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
          <div key={user._id} className="user-card">
            <div className="user-card-left">
              <div className="user-profile-image">
                {user.profileImage ? (
                  <img src={`http://localhost:3000${user.profileImage}`} alt={user.name} />
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
                  onClick={() => {
                    setSelectedUser(user);
                    setShowProfileCard(true);
                  }}
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

      {showProfileCard && selectedUser && (
        <ProfileCard
          user={selectedUser}
          onClose={() => {
            setShowProfileCard(false);
            setSelectedUser(null);
          }}
        />
      )}

    </div>
  );
}

export default Users;