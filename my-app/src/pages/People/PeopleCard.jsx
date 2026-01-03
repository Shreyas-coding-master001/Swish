import { useState } from "react";
import "./PeopleCard.css";
import ProfileCard from "../../Components/ProfileCard";

function PeopleCard({ user }) {
    const [showProfileCard, setShowProfileCard] = useState(false);

    return (
        <div>
            <div className="people-cards">
                <img
                    src={
                        user.profileImage
                        ? `http://localhost:3000${user.profileImage}`
                        : "/images/profilelogo.png"
                    }
                    className="people-profile-logo"
                    alt="profile"
                    onClick={() => setShowProfileCard(true)}
                />

                <p className="swish-tag-people">{user.tag}</p>

                <div className="name-role-people">
                    <p className="people-name">{user.name}</p>
                    <p className="people-role">{user.department || user.role}</p>
                </div>

                <p className="bio-desc-people">{user.bio}</p>

                <div className="bio-follow-button-people">
                    <button className="bio-button">Bio</button>
                    <button className="follow-button-people">Follow</button>
                </div>
            </div>

            {showProfileCard && (
                <ProfileCard 
                    user={user} 
                    onClose={() => setShowProfileCard(false)} 
                />
            )}
        </div>
    );
}

export default PeopleCard;