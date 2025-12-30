import { useState, useRef, useEffect } from "react";
import "./Profile.css";
import axios from "axios";

function Profile(){
    const [profileImage, setProfileImage] = useState(null);
    const [bio, setBio] = useState("");
    const fileInputRef = useRef(null);
    const [user,setUser] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const imageData = reader.result;
            setProfileImage(imageData); 

            await axios.put(
                "http://localhost:3000/api/auth/profile-image",
                { profileImage: imageData },
                { withCredentials: true }
            );
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
    axios
        .get("http://localhost:3000/api/auth/profile", {
        withCredentials: true
        })
        .then(res => {
        setUser(res.data);
        setBio(res.data.bio || "");
        setProfileImage(res.data.profileImage || null);
        })
        .catch(err => {
        console.log("Profile fetch failed:", err);
        });
    }, []);



    const handleImageClick = () => {
        alert("iMAGE UPLOAD COMING SOON");
    };

    return (
        <div className="profile-section">
            <div className="sections">
                <div className="left-section-profile">
                    <input ref={fileInputRef} type="file" accept="image/*" className="profile-input" onChange={handleImageUpload} />
                    <div className="profile-image-wrapper">
                        {profileImage ? (
                            <>
                                <img className="profile-image" src={`http://localhost:3000${profileImage}`} alt="Profile" onClick={handleImageClick} />

                                <p className="verification-batch">Verified</p>
                            </>
                        ) : (
                            <div className="profile-image-placeholder" onClick={handleImageClick}>
                                Click to upload<br/>profile image
                            </div>
                        )}
                    </div>
                    <p className="tag">@{user?.tag}</p>
                    
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
                        <p className="name">{user?.name}</p>
                        <span className="role">{user?.role}</span>
                    </div>
                    
                    <input className="bio-input" placeholder="Describe yourself in short" value={bio} onChange={(e) => setBio(e.target.value)}/>
                    {/* {bio && (
                        <p className="bio">{bio}</p>
                    )} */}
                    
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