import { useState, useEffect } from "react";
import "./Card.css";
import axios from "axios";

function Card(props){
    const [post,setPost] = useState(true);
    const [isliked, setlike] = useState(false);
    const [likeCount, setLikeCount] = useState(props.likedAcc?.length || 0);

    const Likedhandle = async () => { 
        await axios.post(`http://localhost:3000/post/like/${props.post._id}`, {},{
            withCredentials: true
        }).then(res => {
            console.log(res.data);
            setLikeCount(res.data.length);
            setlike(prev=>!prev);
        })
        .catch(err => console.error(err.message))
    }
    const image = props.post.Post;
    return(
    <div className="Post">
        <div className="top">
            <div className="One">
                <div className="ProfilePhoto">
                    <img src="https://images.unsplash.com/photo-1766310549540-2de9da114f2b?q=80&w=1159&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="ProfilePhoto"/>
                </div>
                <h3>{props.post.user.name}</h3>
            </div>
            <button>Follow</button>
        </div>
        <div className="displaySection" onDoubleClick={Likedhandle}>
            { post? <img src={`http://localhost:3000${image}`} alt="Post" /> 
            :<video src autoplay> Your Brower Does not Support the video </video>}
            <div className={isliked? "LikedAni" : "disable"}>
                <i className="ri-heart-fill"></i>
            </div>
        </div>
        <div className="bottom">
            <div className="Icons">
                <div className="likeButton" onClick={Likedhandle}>
                {isliked?<i className="ri-heart-fill"></i>:<i className="ri-heart-line"></i>}
                <h6>Like</h6>
                </div>
                <div className="commentButton"><i className="ri-chat-1-line"></i>
                <h6>comment</h6></div>
                <div className="shareButton"><i className="ri-share-2-line"></i>
                <h6>share</h6></div>
                <div className="repostbuttton"><i className="ri-arrow-go-back-line"></i>
                <h6>repost</h6></div>
            </div>
            <p>{likeCount} Likes</p>
            <div className="Desciption">
                <h3>Description </h3>
                <h4>Views :</h4>
                <input type="text" placeholder="Add a Comment..."/>
            </div>
        </div>
    </div>);
}   

export default Card;
