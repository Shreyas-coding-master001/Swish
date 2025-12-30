import "./HomePage.css";
import { Routes,Route, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo-removebg-preview.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostSection from "../UI Components/PostUpload";
import Card from "../pages/Post/Card";

function HomePage(){
    const [clicked,setClicked] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {

     }

    return( <div className="HomeSection">
        <section id="Main_Navigation"> 
            <div className="One">
                <a href="/home"><img src={Logo} alt="Logo" /></a>
                <h2>Swish</h2>
            </div>
            <div className="One">
                <i className="ri-search-line"></i>
                <input type="text" placeholder="Serach"/>
            </div>
        </section>
        <nav id="SectionChanging">
            <Link to="" className="LINKS">Home</Link>
            <Link to="profile" className="LINKS">Profile</Link>
            <Link to="community" className="LINKS">Community</Link>
            <Link className="LINKS">About</Link>
            <Link className="LINKS">Contact</Link>
        </nav>
        <div className="target"></div>
        <div id={clicked? "complete": "PostInteracting"}>
            <section className="AddPost">
                <h3>Share your story with a post</h3>
                <button onClick={() => setClicked(prev=>!prev)}>Click To Post</button>
            </section>
            <div className="Postbox">
                <Card />
                <Card />
                <Card />
                <Card />    
            </div>
        </div>
        <div className={clicked?"postVisible":"postingdisable"}>
            <button onClick={() => setClicked(prev=>!prev)} className="Close">X</button>
            <h3>Post Your Activity : </h3>
            <form className="InputTaking" onSubmit={handleSubmit}>
                <h4 htmlFor="DesicriptionArea">Description: </h4>
                <textarea name="DesicriptionArea" id="DesciptionArea"></textarea>
                <input type="file" id="fileUpload" />
                <button type="submit">Create</button>
            </form>
        </div>
         <section id="UserInteraction">
            <Outlet />
        </section>
    </div>);
}

export default HomePage;