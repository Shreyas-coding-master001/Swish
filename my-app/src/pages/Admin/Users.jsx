import { useState, useEffect } from "react";
import "./Users.css";
import axios from "axios";
import ProfileCard from "../../Components/ProfileCard";

function Users() {
  const [selectedRole, setSelectedRole] = useState("");
  const [users,setUsers] = useState([])
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openRoleUserId, setOpenRoleUserId] = useState(null);
  const [userRoles, setUserRoles] = useState({});
  const [userStatus, setUserStatus] = useState({});

  useEffect(() => { 
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/users",
          { withCredentials: true }
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);



  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleChangeRole = (userId) => {
    setOpenRoleUserId(prev => (prev === userId ? null : userId));
  };

  const handleSelectRole = async (userId, role) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/admin/users/${userId}/role`,
        { role },
        { withCredentials: true }   // 🔥 REQUIRED
      );


      setUserRoles(prev => ({
        ...prev,
        [userId]: role
      }));
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }

    setOpenRoleUserId(null);
  };


  const handleToggleBlock = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active";

    try {
      await axios.patch(
        `http://localhost:3000/api/admin/users/${userId}/status`,
        { status: newStatus },
        { withCredentials: true }  
      );


      setUserStatus(prev => ({
        ...prev,
        [userId]: newStatus
      }));
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
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
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="alumni">Alumni</option>
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
                <span className="user-role-badge">
                  {userRoles[user._id] || user.role}
                </span>

                <span
                  className={`user-status-badge ${
                    (userStatus[user._id] || user.status) === "Active"
                      ? "status-active"
                      : "status-blocked"
                  }`}
                >
                  {userStatus[user._id] || user.status}
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

              <div className="role-action-wrapper">
                <button
                  className="user-action-btn btn-role"
                  onClick={() => handleChangeRole(user._id)}
                >
                  Change Role
                </button>

                {openRoleUserId === user._id && (
                  <div className="role-dropdown">
                    <div onClick={() => handleSelectRole(user._id, "student")}>Student</div>
                    <div onClick={() => handleSelectRole(user._id, "faculty")}>Faculty</div>
                    <div onClick={() => handleSelectRole(user._id, "alumni")}>Alumni</div>
                    <div onClick={() => handleSelectRole(user._id, "community member")}>Community Member</div>
                  </div>
                )}
              </div>

              <button
                className={`user-action-btn ${user.status === "Active" ? "btn-block" : "btn-unblock"}`}
                  onClick={() =>
                    handleToggleBlock(
                      user._id,
                      userStatus[user._id] || user.status
                    )
                  }
              >
                {(userStatus[user._id] || user.status) === "Active"
                  ? "Block"
                  : "Unblock"}
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