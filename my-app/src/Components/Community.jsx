import { useState, useEffect } from "react";
import "./Community.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Community(){

    const[joined,setJoined] = useState(true);
    const[members,openMembers] = useState(false);
    const[allCommunities,showAllCommunities] = useState(false);
    const [communityData, setComData] = useState([]);

    useEffect(function(){
        try{
            axios.get("http://localhost:3000/community",{withCredentials: true})
            .then(res => {
                console.log(res.data);
                
                setComData(res.data);
            });
        }catch(err) {
            alert("error Occured")
            console.error(err.message);
        }

    },[])

    function handleOpenings(){
        openMembers(!members);
    }

    function joinCommunity(){
        setJoined(!joined);
    }

    function handleCommunities(){
        showAllCommunities(!allCommunities);
    }

    return <div className="community-container">
            {members &&(
                <div className="organizers-overlay" onClick={() => openMembers(false)}>
                    <div className="right-new-community"  onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => openMembers(false)}>×</button>
                        <div className="organizers-section">
                            <p className="new-organizers-label">Community organizers</p>
                            <div className="new-community-organizers">
                                <div className="new-community-profile">
                                    <img src="../images/profilelogo.png" alt="profile logo" className="new-organizer-profile"/>
                                    <p className="new-organizer-name">Name 1</p>
                                    <p className="new-organizer-role">President</p>
                                </div>
                                <div className="new-community-profile">
                                    <img src="../images/profilelogo.png" alt="profile logo" className="new-organizer-profile"/>
                                    <p className="new-organizer-name">Name 2</p>
                                    <p className="new-organizer-role">Chair person</p>
                                </div>
                                <div className="new-community-profile">
                                    <img src="../images/profilelogo.png" alt="profile logo" className="new-organizer-profile"/>
                                    <p className="new-organizer-name">Name 3</p>
                                    <p className="new-organizer-role">Vice President</p>
                                </div>
                                <div className="new-community-profile">
                                    <img src="../images/profilelogo.png" alt="profile logo" className="new-organizer-profile"/>
                                    <p className="new-organizer-name">Name 4</p>
                                    <p className="new-organizer-role">Treasurer</p>
                                </div>
                            </div>
                        </div>
                        <p className="new-members-label">Members joined</p>
                        <div className="members-section">
                            <div className="new-community-members">
                                <div className="new-community-members-profile">
                                    <img src="../images/profilelogo.png" alt="profile logo" className="new-members-profile"/>
                                    <p className="new-members-name">Member 1</p>
                                </div>
                                <div className="new-community-members-profile">
                                    <img src="../images/profilelogo.png" alt="profile logo" className="new-members-profile"/>
                                    <p className="new-members-name">Member 2</p>
                                </div>
                                <div className="new-community-members-profile">
                                    <img src="../images/profilelogo.png" alt="profile logo" className="new-members-profile"/>
                                    <p className="new-members-name">Member 3</p>
                                </div>
                                <div className="new-community-members-profile">
                                    <img src="../images/profilelogo.png" alt="profile logo" className="new-members-profile"/>
                                    <p className="new-members-name">Member 4</p>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {allCommunities && (
                <div className="initial-section">
                    <div className="left-section-community-before">
                        <div className="new-community">
                            <img src="../images/Communitylogo2.png" alt="community logo" className="new-community-logo"/>
                            <p className="new-community-name">Community 1</p>
                            <p className="new-community-description">Learn grow rich</p>
                            <div className="new-left-bottom-buttons">                        
                                <button className="new-view-members-button" onClick={handleOpenings}>View members</button>
                                <div className="left-bottom-new-section">
                                    <button className="new-about-button">About</button>
                                    <button className="new-join-button" onClick={joinCommunity}>Join</button>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="right-community-section">
                        <p>Trending communities!</p>
                        <div className="more-communities">
                            <div className="community">
                                <div className="profile-name-community">
                                    <img src="../images/Communitylogo1.png" className="community-profile"/>
                                    <p className="name-of-community">Community1</p>
                                </div>
                                <div className="about-join">
                                    <button className="about-community-button">About</button>
                                    <button className="join-community-button">Join</button>
                                </div>
                            </div>
                            <div className="community">
                                <div className="profile-name-community">
                                    <img src="../images/Communitylogo2.png" className="community-profile"/>
                                    <p className="name-of-community">Community2</p>
                                </div>
                                <div className="about-join">
                                    <button className="about-community-button">About</button>
                                    <button className="join-community-button">Join</button>
                                </div>
                            </div>
                            
                                          
                        </div>
                    </div>

                </div>
            )
            }
       

        {joined && (
            <div className="community-sections">
                <div className="left-community-section">
                    <div className="community-name">
                        <img src="../images/logo.png" className="community-logo"/>
                        <p>{communityData[0]?.Community}</p>
                    </div>
                    <div className="community-organizers">
                       {communityData[0]?.users?.map((data, idx) => {
                            return (
                                <div className="role-section" key={idx}>
                                    <img
                                        src={`http://localhost:3000${data.profileImage}`}
                                        className="role-profile"
                                    />
                                    <div className="name-role">
                                        <p className="name-community">{data.name}</p>
                                        <p className="role-community">{data.role}</p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    <button className="view-community-button"  onClick={handleOpenings}>View members</button>
                </div>
                <div className="middle-community-section">
                    <div className="middle-top-community-section">
                        <div className="query-links">  
                            <Link to="/home/community/Discuss" className="LINKS-Discuss">Discuss</Link>
                            <Link to="/home/community/Create" className="LINKS-Discuss">Create</Link>
                            {/* <a className="link-community">Share</a>
                            <a className="link-community">Help</a> */}
                        </div>
                        <div className="select-type">
                            <p className="type-post-community">Select type: </p>
                            <select defaultValue="">
                                <option value="" disabled> Select type </option>
                                <option>All</option>
                                <option>Q&A</option>
                                <option>Reviews</option>
                                <option>Polls</option>
                            </select>

                        </div>
                    </div>
                    <div className="middle-bottom-community-section">
                        <Outlet />
                        {/* {communityData.posts?.map((post, idx)=>{
                            return(
                                    <div className="community-post" key={idx}>
                                        <h3>Talk with Your Members</h3>
                                    </div>
                            )
                        })} */}
                    </div>
                </div> 
                <div className="right-community-section">
                    <p>Explore more communities!</p>
                    <div className="more-communities">
                        <div className="community">
                            <div className="profile-name-community">
                                <img src="../images/Communitylogo1.png" className="community-profile"/>
                                <p className="name-of-community">Community1</p>
                            </div>
                            <div className="about-join">
                                <button className="about-community-button">About</button>
                                <button className="join-community-button">Join</button>
                            </div>
                        </div>
                        <div className="community">
                            <div className="profile-name-community">
                                <img src="../images/Communitylogo2.png" className="community-profile"/>
                                <p className="name-of-community">Community2</p>
                            </div>
                            <div className="about-join">
                                <button className="about-community-button">About</button>
                                <button className="join-community-button">Join</button>
                            </div>
                        </div>
                        <div className="community">
                            <div className="profile-name-community">
                                <img src="../images/Communitylogo3.png" className="community-profile"/>
                                <p className="name-of-community">Community3</p>
                            </div>
                            <div className="about-join">
                                <button className="about-community-button">About</button>
                                <button className="join-community-button">Join</button>
                            </div>
                        </div> 
                            <div className="community">
                            <div className="profile-name-community">
                                <img src="../images/Communitylogo3.png" className="community-profile"/>
                                <p className="name-of-community">Community3</p>
                            </div>
                            <div className="about-join">
                                <button className="about-community-button">About</button>
                                <button className="join-community-button">Join</button>
                            </div>
                        </div>                        
                    </div>
                    <button className="view-all-community-button"  onClick={handleCommunities}>View all communities</button>
                </div>
            </div>)
        }
    </div>
}

export default Community;