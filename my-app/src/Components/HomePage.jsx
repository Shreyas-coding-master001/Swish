import "./HomePage.css";
import { Routes,Route, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo-removebg-preview.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostSection from "../UI Components/PostUpload";
import Card from "../pages/Post/Card";
import axios from "axios";

function HomePage(){
    const [clicked,setClicked] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("description", e.target.description.value);
        formData.append("media", e.target.media.files[0]);

        try {
            const res = await axios.post(
            "http://localhost:3000/postInput",
            formData, {
                withCredentials: true
            }
            );
            setPosts(res.data);
            console.log(res.data);
            
            setClicked(prev=>{
                if(prev) document.documentElement.style.setProperty("--x","auto");
                else document.documentElement.style.setProperty("--x","hidden");
                return !prev
            });
            
        } catch (err) {
            console.error(err);
        }       
    };

    useEffect(function(){
        axios.get("http://localhost:3000/DisplayPost", {
            withCredentials: true
        })
        .then(res => setPosts(res.data))
        .catch(err => console.error(err.message));
    },[]);

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
        </nav>
        <div className="target"></div>
        <div id={clicked? "complete": "PostInteracting"}>
            <section className="AddPost">
                <h3>Share your story with a post</h3>
                <button onClick={() => setClicked(prev=>{
                    if(prev) document.documentElement.style.setProperty("--x","auto");
                    else document.documentElement.style.setProperty("--x","hidden");
                    return !prev
                })}>Click To Post</button>
            </section>
            {posts.map(post => (
                <div className="Postbox" key={post._id}>
                    <Card post={post} />
                </div>
            ))}

            
        </div>
        <div className={clicked ? "postVisible" : "postingdisable"}>
            <button onClick={() => setClicked(prev =>{
                if(prev) document.documentElement.style.setProperty("--x","auto");
                else document.documentElement.style.setProperty("--x","hidden");
                return !prev
            })}  className="Close">X</button>

            <h3>Post Your Activity :</h3>

            <form className="InputTaking" onSubmit={handleSubmit}>
                <h4>Description:</h4>
                <textarea
                    name="description"
                    id="DesciptionArea"
                />

                <input
                    type="file"
                    name="media"
                />

                <button type="submit">Post</button>

            </form>
            </div>
            {/* <section id="UserInteraction">
                <Outlet /> 
            </section> */}
    </div>);
}

export default HomePage;