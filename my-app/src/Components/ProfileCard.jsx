import { useState } from "react";
import "./ProfileCard.css";

function ProfileCard({ user, onClose }) {
    const [bio, setBio] = useState(user?.bio || "");

    if (!user) return null;

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("profile-card-overlay")) {
            onClose();
        }
    };

    return (
        <div className="profile-card-overlay" onClick={handleOverlayClick}>
            <div className="profile-card">
                <button className="close-button" onClick={onClose}>×</button>
                
                <div className="card-sections">
                    <div className="card-left-section">
                        <div className="card-profile-image-wrapper">
                            {user.profileImage ? (
                                <>
                                    <img 
                                        className="card-profile-image" 
                                        src={`http://localhost:3000${user.profileImage}`}
                                        alt="Profile" 
                                    />
                                    <p className="card-verification-badge">Verified</p>
                                </>
                            ) : (
                                <div className="card-profile-image-placeholder">
                                    No profile image
                                </div>
                            )}
                        </div>
                        <p className="card-tag">@{user.tag}</p>
                        
                        <div className="card-action-buttons">
                            <button className="card-follow-button">Follow</button>
                            <button className="card-message-button">Message</button>
                        </div>

                        <div className="card-communities-section">
                            <p className="card-communities-title">Communities</p>
                            <div className="card-community-item">Community 1</div>
                            <div className="card-community-item">Community 2</div>
                            <div className="card-community-item">Community 3</div>
                        </div>
                    </div>

                    <div className="card-right-section">
                        <div className="card-name-role-section">
                            <p className="card-name">{user.name}</p>
                            <span className="card-role">{user.department || user.role || "Member"}</span>
                        </div>
                        
                        <div className="card-bio-display">
                            {bio ? (
                                <p className="card-bio-text">{bio}</p>
                            ) : (
                                <p className="card-bio-text card-bio-empty">No bio available</p>
                            )}
                        </div>
                        
                        <button className="card-about-button">About them →</button>
                        
                        <div className="card-count-section">
                            <p className="card-follower">Followers: {user.followers || 0}</p>
                            <p className="card-following">Following: {user.following || 0}</p>
                            <p className="card-post-count">Posts: {user.postCount || 0}</p>
                            <p className="card-community-joined">Communities: {user.communityCount || 0}</p>
                        </div>
                        
                        <div className="card-post-section">
                            <div className="card-post">Post 1</div>
                            <div className="card-post">Post 2</div>
                            <div className="card-post">Post 3</div>
                            <div className="card-post">Post 4</div>
                            <div className="card-post">Post 5</div>
                            <div className="card-post">Post 6</div>
                        </div>
                    </div>              
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;