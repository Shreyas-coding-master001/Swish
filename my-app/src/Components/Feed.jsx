import './Feed.css'
import { useState } from "react";
import PostSection from "../UI Components/PostUpload";
import Card from "../pages/Post/Card";

function Feed(){

    const [clicked,setClicked] = useState(false);

    const handleSubmit = () => {
        alert("Post Uploaded");
    }
    return <div>
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
                <textarea name="DesicriptionArea" id="DescriptionArea"></textarea>
                <input type="file" id="fileUpload" />
                <button type="submit">Create</button>
            </form>
        </div>
    </div>
}

export default Feed;