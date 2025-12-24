import { useState, useRef } from "react";
import "./Profile.css";

function Profile(){
    const [profileImage, setProfileImage] = useState(null);
    const [bio, setBio] = useState("");
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="profile-section">
            <div className="sections">
                <div className="left-section-profile">
                    <input ref={fileInputRef} type="file" accept="image/*" className="profile-input" onChange={handleImageUpload} />
                    <div className="profile-image-wrapper">
                        {profileImage ? (
                            <>
                                <img className="profile-image" src={profileImage} alt="Profile" onClick={handleImageClick} />
                                <p className="verification-batch">Verified</p>
                            </>
                        ) : (
                            <div className="profile-image-placeholder" onClick={handleImageClick}>
                                Click to upload<br/>profile image
                            </div>
                        )}
                    </div>
                    <p className="tag">Swish tag</p>
                    
                    <div className="action-buttons">
                        <button className="follow-button">Follow</button>
                        <button className="message-button">Message</button>
                    </div>

                    <div className="communities-section">
                        <p className="communities-title">Communities</p>
                        <div className="community-item">Community 1</div>
                        <div className="community-item">Community 2</div>
                        <div className="community-item">Community 3</div>
                    </div>
                </div>

                <div className="right-section-profile">
                    <div className="name-role-section">
                        <p className="name">Name</p>
                        <span className="role">Role</span>
                    </div>
                    
                    <input className="bio-input" placeholder="Describe yourself in short" value={bio} onChange={(e) => setBio(e.target.value)}/>
                    {bio && (
                        <p className="bio">{bio}</p>
                    )}
                    
                    <button className="about-button">About them →</button>
                    
                    <div className="count-section">
                        <p className="follower">Followers: 0</p>
                        <p className="following">Following: 0</p>
                        <p className="post-count">Post count: 0</p>
                        <p className="community-joined">Community Joined: 0</p>
                    </div>
                    
                    <div className="post-section">
                        <div className="post">Post 1</div>
                        <div className="post">Post 2</div>
                        <div className="post">Post 3</div>
                        <div className="post">Post 4</div>
                        <div className="post">Post 5</div>
                        <div className="post">Post 6</div>
                        <div className="post">Post 7</div>
                        <div className="post">Post 8</div>
                        <div className="post">Post 9</div>
                    </div>
                </div>              
            </div>
        </div>
    );
}

export default Profile;