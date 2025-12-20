import { useState } from "react";
import "./SignIn.css"
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

function SignIn(){
  const navigate = useNavigate();
    const[signup,setSignUp] = useState(false);
    const[displaySignIn,setDisplaySignIn] = useState(true);

    const hideSignIn = () => {
        setDisplaySignIn(false);
        setSignUp(true);

    }

    function JoinButton(){
        navigate("/home");
    }

    return <div className="signin-background">
        {signup && <SignUp/>}
        {displaySignIn && 
            <div className="signin-container">
            <div
            className="image-wrapper-signin"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
            }}
              >
              <img
                className="campus-image-signin"
                src="src/assets/SignInBackground.jpg"
                alt="Campus"
              />

          <div className="spotlight-overlay"></div>
        </div>


                <div className="right-section-signin">
                    <p className="logo-signin">Swish</p>
                    <p className="email-title-signin">Campus email</p>
                    <input className="email-input-signin" placeholder="Enter your email"/>
                    <p className="password-title-signin">Password</p>
                    <input className="password-input-signin" placeholder="Enter your passord"/>
                    <p className="forgot-password-title-signin">Forgot Password?</p>
                    <div className="bottom-section-signin">
                        <p className="account-title-signin">Not a swish member? <span className="signup-link" onClick={hideSignIn}>Sign up</span></p>
                        <button className="signin-button" onClick={JoinButton}>SignIn</button>
                    </div>
                </div>
            </div>
        }
        
    </div>
}

export default SignIn;