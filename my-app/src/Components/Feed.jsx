import './Feed.css'
import { useState, useEffect } from "react";
import PostSection from "../UI Components/PostUpload";
import Card from "../pages/Post/Card";
import axios from "axios";

function Feed(){

    const [clicked,setClicked] = useState(false);
    const [description,setDescription] = useState("");
    const [Community,setCommunity] = useState("");
    const [user, setUsers] = useState([]);
    const [media, setMedia] = useState(null);
    const [posts, setPosts] = useState([]);
    const [feed, setFeed] = useState(posts.user?.college || "");

    async function handleChange(e){
        const communityId = e.target.value;
    
        try {
            const url = communityId
            ? `http://localhost:3000/DisplayPostCommunity/${communityId}`
            : `http://localhost:3000/DisplayPost`;

            const res = await axios.get(url, { withCredentials: true });
            console.log(res.data);
            setPosts(res.data);
            setCommunity(communityId);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(function(){
        
        axios.get("http://localhost:3000/users", {
            withCredentials: true
        }).then(res => {setUsers(res.data)})
        .catch(err => console.error(err.message));

        
        axios.get("http://localhost:3000/DisplayPost", {
            withCredentials: true
        })
        .then(res => {              
            setPosts(res.data);
            setFeed(res.data.user?.college);
        })
            .catch(err => console.error(err.message));
    },[]);


    const handlePostUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return ;
        setMedia(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("description", description);
        if (media) {
            formData.append("media", media);
        }
        const url = Community === "" || Community === user?.college 
            ? `http://localhost:3000/postInput`
            :`http://localhost:3000/POstInputcommunity/${Community}`;

        try {
            const res = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            // Update posts after successful creation
            setPosts(res.data);
            setDescription("");
            setMedia(null);
            setClicked(false);
        } catch (err) {
            console.error(err);
            alert("Failed to create post: " + (err.response?.data || err.message));
        }
    };

    return <div className="post-container-feed">
        <div className="Post-Community-Change" >
            <h3>Current Community Feed : </h3>
            <select name="category" onChange={handleChange}>
                {user?.Community?.map(function(ele, idx){
                    return(<option value={`${ele.Community}`} key={ele._id}>{ele.Community}</option>)
                })}
            </select>
        </div>
        <div id={clicked? "complete": "PostInteracting"}>
            <section className="AddPost">
                <h3>Share your story with a post</h3>
                <button onClick={() => setClicked(prev=>{
                    if(prev) document.documentElement.style.setProperty("--x","auto");
                    else document.documentElement.style.setProperty("--x","hidden");
                    return !prev
                })}>Click To Post</button>
            </section>

            <div className="Postbox">
                {posts.map(post => {
                    if (!post || !post.user || !post._id) return null;
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
                        <div className="Cardbox" key={post._id}>
                            <Card {...postData} />
                        </div>
                    );
                })}
            </div>
        </div>
        <div className={clicked?"postVisible":"postingdisable"}>
            <button onClick={() => setClicked(prev=>!prev)} className="Close">X</button>
            <h3>Post Your Activity : </h3>
            <form className="InputTaking" onSubmit={handleSubmit}>
                <h4 htmlFor="DesicriptionArea"  >Description: </h4>
                <textarea id="DescriptionArea" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <input type="file" accept="image/*" id="fileUpload" name="media" onChange={handlePostUpload}/>
                <button type="submit">Create</button>
            </form>
        </div>
    </div>
}

export default Feed;
