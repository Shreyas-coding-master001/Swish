import "./SignUp.css"
import SignIn from "./SignIn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const navigate = useNavigate();
    const [sigin,setSignin] = useState(false);
    const[display,setDisplay] = useState(true);
    const[profileImage,setProfileImage] = useState(null);


    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const imageURL = URL.createObjectURL(file);
        setProfileImage(imageURL);
    }


    const hideSignUp =() => {
        setSignin(true);
        setDisplay(false);
    }
    return <div className="background">
        {sigin && <SignIn/>}
        {display &&
                <div className="signup-container">
                <div className="top-section">
                    <p className="logo">Swish</p>
                </div>

                <div className="sections-container">
                    <div className="left-section">
                        <p className="college-title">College/Institution</p>
                        <input className="college-input" placeholder="Enter your college or institution" required/>
                        <p className="name-title">Full Name</p>
                        <input className="name-input" placeholder="Enter your name" required/>
                        <p className="email-title">Campus Email</p>
                        <input className="email-input" placeholder="Enter your campus email" required/>
                        <p className="password-title">Password</p>
                        <input className="password-input" placeholder="Enter password" required/>
                        <p className="confirm-password-title">Confirm password</p>
                        <input className="confirm-password-input" placeholder="Confirm your password" required/>
                        <p className="role-title">Role</p>
                        <select className="role-input">
                            <option>Student</option>
                            <option>Faculty</option>
                            <option>Alumni</option>
                            <option>Community member</option>
                        </select>
                    </div>
                    <div className="right-section">
                        
                        <div
                        className="signup-bg-reveal"
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            e.currentTarget.style.setProperty(
                            "--x",
                            `${e.clientX - rect.left}px`
                            );
                            e.currentTarget.style.setProperty(
                            "--y",
                            `${e.clientY - rect.top}px`
                            );
                        }}
                        >
                            <img src="src/assets/SignUpBackground.jpg" className="bg-image base"alt="campus"/>

                            <img src="src/assets/SignUpBackground.jpg" className="bg-image spotlight" alt="campus"/>
                        </div>

                        <p className="profile-title">Shape <br/> Your <br/> Identity</p>
                        <input type="file" accept="image/*" className="image-input" onChange={handleImageUpload } />
                        {profileImage && <img     className="profile-preview" src={profileImage} />}
                        <p className="tag-title">SwishTag</p>
                        <input className="tag-input" placeholder="Enter a special tag for you"/>
                        <p className="bio-title">Bio</p>
                        <textarea className="about-input" placeholder="Enter about yourself"/>
                        <p className="department-title">Department</p>
                        <input className="department-input" placeholder="Enter your department"/>
                        <p className="interests-title">Interests</p>
                        <input className="interests-input" placeholder="Enter your interests"/>
                    </div>
                </div>
                <div className="bottom-section">
                    <div className="account-section">   
                        <p className="account-title">Already have an account? <span className="signin-link" onClick={hideSignUp}>Login</span> </p>
                        <button className="signup-button" onClick={()=>navigate("/home")}>Sign up</button>
                    </div>
                </div>
            </div>
        }
    </div>
}

export default SignUp;