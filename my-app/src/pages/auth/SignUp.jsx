import "./SignUp.css";
import SignIn from "./SignIn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [sigin, setSignin] = useState(false);
  const [display, setDisplay] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [college, setCollege] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tag, setTag] = useState("");
  const [bio, setBio] = useState("");
  const [department, setDepartment] = useState("");
  const [interests, setInterests] = useState("");
          
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
  }

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("college", college);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("tag", tag);
      formData.append("bio", bio);
      formData.append("department", department);
      formData.append("interests", interests);

      if (profileImage) {
        formData.append("profileImage", profileImage); // FILE
      }

      await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setLoading(false);
      setSignin(true);
      setDisplay(false);
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const hideSignUp = () => {
    setSignin(true);
    setDisplay(false);
  };

  return (
    <div className="background">
      {sigin && <SignIn />}
      {display && (
        <div className="signup-container">
          <div className="top-section">
            <p className="logo">Swish</p>
          </div>

          <div className="sections-container">
            <form onSubmit={handleSend}>
              <div className="left-section">
                <p className="college-title">College/Institution</p>
                <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} className="college-input" placeholder="Enter your college or institution" required/>

                <p className="name-title">Full Name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="name-input"  placeholder="Enter your name" required/>

                <p className="email-title">Campus Email</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="email-input" placeholder="Enter your campus email" required />

                <p className="password-title">Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="password-input" placeholder="Enter password"  required />

                <p className="confirm-password-title">Confirm password</p>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  className="confirm-password-input" placeholder="Confirm your password" required />

                <p className="role-title">Role</p>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="role-input" >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="alumni">Alumni</option>
                  <option value="community member">Community member</option>
                </select>
              </div>
            </form>

            {error && <p className="error-text">{error}</p>}

            <div className="right-section">
              <div className="signup-bg-reveal" onMouseMove={(e) => {
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
                <img src="src/assets/SignUpBackground.jpg" className="bg-image base" alt="campus" />
                <img src="src/assets/SignUpBackground.jpg" className="bg-image spotlight" alt="campus" />
              </div>

              <p className="profile-title">
                Shape <br /> Your <br /> Identity
              </p>

              <input type="file" accept="image/*" className="image-input" onChange={handleImageUpload} />

              {profileImage && (
                <img
                  className="profile-preview"
                  src={URL.createObjectURL(profileImage)}
                />
              )}


              <p className="tag-title">SwishTag</p>
              <input value={tag} onChange={(e) => setTag(e.target.value)} className="tag-input" placeholder="Enter a special tag for you" />

              <p className="bio-title">Bio</p>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="about-input" placeholder="Enter about yourself" />

              <p className="department-title">Department</p>
              <input value={department} onChange={(e) => setDepartment(e.target.value)} className="department-input" placeholder="Enter your department" />

              <p className="interests-title">Interests</p>
              <input value={interests} onChange={(e) => setInterests(e.target.value)} className="interests-input" placeholder="Enter your interests" />
            </div>
          </div>

          <div className="bottom-section">
            <div className="account-section">
              <p className="account-title">
                Already have an account?{" "}
                <span className="signin-link" onClick={hideSignUp}>
                  Login
                </span>
              </p>

              <button type="submit" className="signup-button" formNoValidate onClick={handleSend} disabled={loading} >
                {loading ? "Please wait..." : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
