import "./Community.css"

function Community(){
    return <div className="community-container">
        <div className="community-sections">
            <div className="left-community-section">
                <div className="community-name">
                    <img src="../images/logo.png" className="community-logo"/>
                    <p>Community Name</p>
                </div>
                <div className="community-organizers">                
                    <div className="role-section">
                        <img src="../images/profilelogo.png" className="role-profile"/>
                        <div className="name-role">
                            <p className="name-community">Person1</p>
                            <p className="role-community">President</p>
                        </div>
                    </div>
                    <div className="role-section">
                        <img src="../images/profilelogo.png" className="role-profile"/>
                        <div className="name-role">
                            <p className="name-community">Person2</p>
                            <p className="role-community">Chair Person</p>
                        </div>
                    </div>
                    <div className="role-section">
                        <img src="../images/profilelogo.png" className="role-profile"/>
                        <div className="name-role">
                            <p className="name-community">Person3</p>
                            <p className="role-community">Vice President</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="middle-community-section">
                <div className="middle-top-community-section">
                    <div className="query-links">  
                        <a className="link-community">Ask</a>
                        <a className="link-community">Share</a>
                        <a className="link-community">Discuss</a>
                        <a className="link-community">Help</a>
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
                    <div className="community-post">Post1</div>
                    <div className="community-post">Post2</div>
                    <div className="community-post">Post3</div>
                    <div className="community-post">Post4</div>
                    <div className="community-post">Post5</div>
                    <div className="community-post">Post6</div>
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
                </div>
            </div>
        </div>
    </div>
}

export default Community;