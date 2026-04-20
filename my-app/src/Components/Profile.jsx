import { useState, useRef, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import Card from "../pages/Post/Card";

function Profile(){
    const [profileImage, setProfileImage] = useState(null);
    const [name,setName] = useState("");
    const [tag,setTag] = useState("");
    const [bio, setBio] = useState("");
    const fileInputRef = useRef(null);
    const [user,setUser] = useState(null);
    const [edit,setEdit] = useState(false);
    const [error,setError] = useState("");
    const [posts, setPosts] = useState([]);
    const [followers,setFollowers] = useState(0);

    useEffect(function(){
        axios.get("http://localhost:3000/DisplayPost", {
            withCredentials: true
        })
        .then(res => setPosts(res.data))
        .catch(err => console.error(err.message));
    },[]);

    
    const handleConnect = async function(){}

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const imageData = reader.result;
            setProfileImage(imageData); 

            await axios.put(
                "http://localhost:3000/profile-image",
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
            console.log("Profile fetch failed:", err.message);
            });
    }, []);

    function handleEdit(){
        setEdit(!edit);
    }

    const editDetails = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("tag", tag);
            formData.append("bio", bio);

            const res = await axios.patch("http://localhost:3000/api/auth/profile",formData,{withCredentials: true});

            console.log("Profile updated:", res.data);
            setEdit(!edit);
        } catch (err) {
            if (err.response?.data?.message) {
            setError(err.response.data.message);
            } else {
            setError("Something went wrong. Please try again.");
            }
            setEdit(!edit);
        }
    };


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
                        <img
                            className="profile-image"
                            src={`http://localhost:3000${profileImage}`}
                            alt="Profile"
                        />
                        ) : (
                        <div className="profile-image-placeholder">
                            Click to upload profile image
                        </div>
                    )}

                    </div>
                    {edit ? (
                        <input className="tag-input-profile" placeholder={"@" + user?.tag} value={tag} onChange={(e)=>setTag(e.target.value)}/>
                    ):(
                        <p className="tag">@{user?.tag}</p>
                    )}
                    
                    <div className="action-buttons">
                        {edit? (
                            <div className="cancel-save-button-profile">
                                <button className="cancel-button-profile" onClick={handleEdit}>Cancel</button>
                                <button className="save-button-profile" onClick={editDetails}>Save</button>
                            </div>
                        ): (
                            <button className="update-button" onClick={handleEdit}>Update Profile</button>
                        )}
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
                        {edit? (
                            <div className="name-role-input-profile">
                                <input className="name-input-profile" placeholder={user?.name} value={name} onChange={(e)=>setName(e.target.value)}/>
                                <span className="role">{user?.role}</span>
                            </div>
                        ):(
                            <div className="name-role-profile">
                                <p className="name">{user?.name}</p>
                                <span className="role">{user?.role}</span>
                            </div>
                        )}
                    </div>
                    
                    
                    {edit? (
                        <input className="bio-input" placeholder="Describe yourself in short" value={bio} onChange={(e) => setBio(e.target.value)}/>
                    ):(
                        <p className="bio">{bio}</p>
                    )}
                    {/* {bio && (
                        <p className="bio">{bio}</p>
                    )} */}
                    
                    <button className="about-button">About them →</button>
                    <button className="connect-button" 
                    onClick={handleConnect}
                    >Connect To Event Pulse</button>
                    
                    <div className="count-section">
                        <p className="follower">Followers: 0</p>
                        <p className="following">Following: 0</p>
                        <p className="post-count">Post count: {posts.length}</p>
                        <p className="community-joined">Community Joined: 0</p>
                    </div>
                    
                    <div className="post-section">
                        {posts.map(post => (
                            <div className="Cardbox" key={post._id}>
                                <Card post={post} />
                            </div>
                        ))}
                    </div>
                </div>              
            </div>
        </div>
    );
}

export default Profile;