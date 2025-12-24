import "./HomePage.css";
import { Routes,Route } from "react-router-dom";
import Logo from "../assets/Logo-removebg-preview.png";
import { useState } from "react";
import { Link,Outlet } from "react-router-dom";

function HomePage(){
    const [clicked,setClicked] = useState("false"); 

    return( <div className="HomeSection">
        <nav id="Main_Navigation"> 
            <div className="One">
                <a href="/home"><img src={Logo} alt="Logo" /></a>
                <h2>Swish</h2>
            </div>
            <div className="One">
                <i className="ri-search-line"></i>
                <input type="text" placeholder="Serach"/>
            </div>
        </nav>
        <nav id="SectionChanging">
            <Link to="" className="LINKS">Home</Link>
            <Link to="profile" className="LINKS">Profile</Link>
            <Link className="LINKS">About</Link>
            <Link className="LINKS">Contact</Link>
        </nav>
        <div className="target"></div>
         <section id="UserInteraction">
            <Outlet />
        </section>
        
    </div>);
}

export default HomePage;