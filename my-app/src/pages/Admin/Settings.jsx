import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [platformSettings, setPlatformSettings] = useState({
    registrationOpen: true,
    communityCreation: true,
    postModeration: false
  });

  const handleToggle = (setting) => {
    setPlatformSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Platform configuration and preferences</p>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h2 className="section-heading">Platform Settings</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-name">User Registration</p>
              <p className="setting-description">Allow new users to register</p>
            </div>
            <button
              className={`toggle-btn ${platformSettings.registrationOpen ? 'toggle-active' : ''}`}
              onClick={() => handleToggle('registrationOpen')}
            >
              {platformSettings.registrationOpen ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-name">Community Creation</p>
              <p className="setting-description">Allow users to create new communities</p>
            </div>
            <button
              className={`toggle-btn ${platformSettings.communityCreation ? 'toggle-active' : ''}`}
              onClick={() => handleToggle('communityCreation')}
            >
              {platformSettings.communityCreation ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-name">Post Moderation</p>
              <p className="setting-description">Require admin approval for new posts</p>
            </div>
            <button
              className={`toggle-btn ${platformSettings.postModeration ? 'toggle-active' : ''}`}
              onClick={() => handleToggle('postModeration')}
            >
              {platformSettings.postModeration ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-heading">Admin Account</h2>
          
          <div className="admin-info-card">
            <div className="admin-detail">
              <p className="admin-label">Username</p>
              <p className="admin-value">admin@swish.com</p>
            </div>
            <div className="admin-detail">
              <p className="admin-label">Role</p>
              <p className="admin-value">Administrator</p>
            </div>
            <button className="admin-action-btn">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;