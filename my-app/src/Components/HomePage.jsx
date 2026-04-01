import "./HomePage.css";
import { Routes,Route, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo-removebg-preview.png";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import PostSection from "../UI Components/PostUpload";
import { useState,useEffect} from "react";

function HomePage(){
    const [clicked,setClicked] = useState(false);
    const [posts, setPosts] = useState([]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append("description", e.target.description.value);
    //     formData.append("media", e.target.media.files[0]);

    //     try {
    //         const res = await axios.post(
    //         "http://localhost:3000/postInput",
    //         formData, {
    //             withCredentials: true
    //         }
    //         );
    //         setPosts(res.data);
    //         console.log(res.data);
            
    //         setClicked(prev=>{
    //             if(prev) document.documentElement.style.setProperty("--x","auto");
    //             else document.documentElement.style.setProperty("--x","hidden");
    //             return !prev
    //         });
            
    //     } catch (err) {
    //         console.error(err);
    //     }       
    // };

    

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
        <div className="completebg">
            <nav id="SectionChanging">
                <Link to="" className="LINKS">Home</Link>
                <Link to="profile" className="LINKS">Profile</Link>
                <Link to="community" className="LINKS">Community </Link>
                <Link to="people" className="LINKS">People</Link>
            </nav>
        </div>
        <div className="target"></div>

         <section id="UserInteraction">
            <Outlet />
        </section>
        {/* <div id={clicked? "complete": "PostInteracting"}>
            <section className="AddPost">
                <h3>Share your story with a post</h3>
                <button onClick={() => setClicked(prev=>{
                    if(prev) document.documentElement.style.setProperty("--x","auto");
                    else document.documentElement.style.setProperty("--x","hidden");
                    return !prev
                })}>Click To Post</button>
            </section>
            {posts.map(post => {
                const postData = {
                    postId: post._id,
                    likedAcc: post.likedAcc || [],
                    userId: post.user._id,
                    userFollowedAcc: post.user.followedAcc || [],
                    Comments: post.Comments || [],
                    postMedia: post.Post,
                    userProfileImage: post.user.profileImage,
                    userName: post.user.name,
                    repostsCount: post.reposts?.length || 0,
                    description: post.Descprition
                };
                return (
                <div className="Postbox" key={post._id}>
                    <Card {...postData} />
                </div>
                );
            })}

            
        </div> */}
        {/* <div className={clicked ? "postVisible" : "postingdisable"}>
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
            </div> */}
            {/* <section id="UserInteraction">
                <Outlet /> 
            </section> */}
    </div>);
}

export default HomePage;