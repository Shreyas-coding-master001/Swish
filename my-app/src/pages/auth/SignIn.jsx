import { useState } from "react";
import "./SignIn.css"
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn(){
    const navigate = useNavigate();
    const[signup,setSignUp] = useState(false);
    const[displaySignIn,setDisplaySignIn] = useState(true);
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);
 
    const hideSignIn = () => {
        setDisplaySignIn(false);
        setSignUp(true);

    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try{
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/auth/signin",
          {email, password}
        );
        
        const {token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user",JSON.stringify(user));
        setLoading(false);
        navigate("/home");
      } catch (err){
        if(err.response && err.response.data.message){
          setLoading(false);
          setError(err.response.data.message);
        } else {
          setLoading(false);
          setError("Something went wrong. Please try again.")
        }
      }
    };

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
                  <form onSubmit={handleSubmit}>
                    <p className="logo-signin">Swish</p>
                    <p className="email-title-signin">Campus email</p>
                    <input type="email" value = {email} onChange={(e) => setEmail(e.target.value)} required className="email-input-signin" placeholder="Enter your email"/>
                    <p className="password-title-signin">Password</p>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="password-input-signin" placeholder="Enter your passord"/>
                    <p className="forgot-password-title-signin">Forgot Password?</p>
                    <div className="bottom-section-signin">
                        <p className="account-title-signin">Not a swish member? <span className="signup-link" onClick={hideSignIn}>Sign up</span></p>
                        <button type="submit" className="signin-button">{loading ? "Signing in..." : "Sign In"}</button>
                    </div>
                  </form>
                  {error && <p className="error-text">{error}</p>}
                </div>
            </div>
        }
        
    </div>
}

export default SignIn;