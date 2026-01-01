import "./People.css"

function People(){
    return <div>
        <div className="people-container">
            <div className="top-section-people">
                <div>
                    <input placeholder="Search peoples around you" className="search-bar-people"/>
                    <button className="search-button-people">Search</button>
                </div>
                <select>
                    <option>Faculty</option>
                    <option>Alumni</option>
                    <option>Student</option>
                </select>
            </div>
            <div className="bottom-section-people">
                <div className="faculty-section-people">
                    <p className="faculty-label-people">Faculty</p>
                    <hr/>
                    <div className="faculty-container-people">
                        <div className="people-cards">
                            <img src="../images/profilelogo.png" className="people-profile-logo"/>
                            <p className="swish-tag-people">Swish tag</p>
                            <div className="name-role-people">
                                <p className="people-name">Faculty Name</p>
                                <p className="people-role">Maths Teacer</p>
                            </div>
                            <p className="bio-desc-people">Short 2-3 words desc</p>
                            <div className="bio-follow-button-people">
                                <button className="bio-button">Bio</button>
                                <button className="follow-button-people">Follow</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="alumni-section-people">
                    <p className="alumni-label-people">alumni</p>
                    <hr/>
                    <div className="alumni-container-people">
                        <div className="people-cards">
                            <img src="../images/profilelogo.png" className="people-profile-logo"/>
                            <p className="swish-tag-people">Swish tag</p>
                            <div className="name-role-people">
                                <p className="people-name">Name</p>
                                <p className="people-role">Role</p>
                            </div>
                            <p className="bio-desc-people">Short 2-3 words desc</p>
                            <div className="bio-follow-button-people">
                                <button className="bio-button">Bio</button>
                                <button className="follow-button-people">Follow</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="students-section-people">
                    <p className="students-label-people">students</p>
                    <hr/>
                    <div className="students-container-people">
                        <div className="people-cards">
                            <img src="../images/profilelogo.png" className="people-profile-logo"/>
                            <p className="swish-tag-people">Swish tag</p>
                            <div className="name-role-people">
                                <p className="people-name">Name</p>
                                <p className="people-role">Role</p>
                            </div>
                            <p className="bio-desc-people">Short 2-3 words desc</p>
                            <div className="bio-follow-button-people">
                                <button className="bio-button">Bio</button>
                                <button className="follow-button-people">Follow</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    </div>
}

export default People;