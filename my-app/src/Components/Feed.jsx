import './Feed.css'
import { useState, useEffect } from "react";
import PostSection from "../UI Components/PostUpload";
import Card from "../pages/Post/Card";
import axios from "axios";

function Feed(){

    const [clicked,setClicked] = useState(false);
    const [description,setDescription] = useState("");
    const [media, setMedia] = useState(null);
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);

    // useEffect(() => {
    // const fetchPosts = async () => {
    //     try {
    //         const res = await axios.get(
    //             "http://localhost:3000/api/auth/posts",
    //             { withCredentials: true }
    //         );
    //         setPosts(res.data.posts);
    //     } catch (err) {
    //     console.error(err);
    //     }
    // };

    // fetchPosts();
    // }, []);
    useEffect(function(){
            axios.get("http://localhost:3000/DisplayPost", {
                withCredentials: true
            })
            .then(res => setPosts(res.data))
            .catch(err => console.error(err.message));
    },[]);


    const handlePostUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return ;
        setMedia(file);
    }

    // const handleSubmit = async(e) => {
    //     e.preventDefault();

    //     try{
    //         const formData = new FormData();
    //     formData.append("description",description);
    //     formData.append("media",media);


    //     await axios.post(
    //         "http://localhost:3000/api/auth/post",
    //         formData,
    //         { withCredentials: true }
    //     );

    //     }catch (err) {
    //         if (err.response && err.response.data.message) {
    //             setError(err.response.data.message);
    //         } else {
    //             setError("Something went wrong. Please try again.");
    //         }
    //     }
        
    // }
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


    return <div className="post-container-feed">
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
                {posts.map(post => (
                <div className="Cardbox" key={post._id}>
                    <Card post={post} />
                </div>
            ))}
  
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