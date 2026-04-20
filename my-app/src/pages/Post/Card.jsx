import { useState } from "react";
import "./Card.css";
import axios from "axios";

function Card({ postId, likedAcc, userId, userFollowedAcc, Comments, postMedia, userProfileImage, userName, repostsCount, description }){
    const [postType,setPost] = useState(true);
    const [value,setvalue] = useState("");
    const [isliked, setlike] = useState(likedAcc?.indexOf(userId) === -1 ? false : true);
    const [isfollowed, setfollowed] = useState({
      followed : userFollowedAcc?.indexOf(userId) === -1? false : true,
    });

    const [commentButton , setComments] = useState({
      comments :  Comments,
      isClcked : false
    })
    const [likeCount, setLikeCount] = useState(likedAcc?.length || 0);

    const Likedhandle = async () => { 

        await axios.post(`http://localhost:3000/post/like/${postId}`, {},{
            withCredentials: true
        }).then(res => {
            console.log(res.data);
            setLikeCount(res.data.length);
            setlike(prev=>!prev);
        })
        .catch(err => console.error(err.message))
    }

    const Followhandle =  async function(){
      
  await axios.post(`http://localhost:3000/post/follow/${userId}`,{}, {withCredentials: true})
      .then(res => setfollowed(prev => ({
        ...prev,
        followed: res.data
      })))
      .catch(err => console.error(err));

    }

    const handleComment = (eve)=>{
      setComments(prev =>({
        ...prev,
        isClcked : !prev.isClcked
      }))
    }

    const handleCommentSend = async function(eve){
      await axios.post(`http://localhost:3000/post/comment/${postId}`,{value}, {withCredentials: true})
      .then(res => {setComments(prev => ({
        ...prev,
        comments: res.data
        }))
      })
      .catch(err => console.error(err));
    }

    const image = postMedia;
    return (
    <div className="Post">
      <div className="top">
        <div className="One">
          <div className="ProfilePhoto">
            {userProfileImage && <img src={`http://localhost:3000${userProfileImage}`} />}
          </div>
          <h3>{userName}</h3>
        </div>
        {
          isfollowed.followed? <button className="Unfollowbutton" onClick={Followhandle}>Unfollow</button>:
          <button  onClick={Followhandle}>Follow</button>
        }
      </div>

      <div className="displaySection" onDoubleClick={Likedhandle}>
        {postType ? (
          <img src={`http://localhost:3000${image}`} alt="Post" />
        ) : (
          <p>{description}</p>
        )}
      </div>

      <div className="bottom">
        <div className="Icons">
          <div className="likeButton" onClick={Likedhandle}>
            {isliked ? <i className="likeWala ri-heart-fill"></i> : <i className="ri-heart-line"></i>}
            <h6>Like</h6>
          </div>

          <div className="commentButton" onClick={handleComment}>
            <i className="ri-chat-1-line"></i>
            <h6>comment</h6>
          </div>

          <div className="shareButton">
            <i className="ri-share-2-line"></i>
            <h6>share</h6>
          </div>

          <div className="repostbuttton">
            <i className="ri-arrow-go-back-line"></i>
            <h6>{repostsCount || 0} repost</h6>
          </div>

        </div>

          <p>{likeCount} Likes</p>

        <div className="Desciption">
            <h3>Describe: <span>{description}</span></h3>
              <form onSubmit={handleCommentSend} className="One">
                <input type="text" placeholder="Add a Comment..."  onChange={e => {
                  setvalue(e.target.value);
                }} value={value} />
                <button type="submit"><i className="ri-send-plane-2-fill"></i></button>
              </form>

            {commentButton.isClcked? 
              <div className="commentBox">
                {commentButton.comments && commentButton.comments.length > 0 ? (
                  commentButton.comments.map((comment, idx) => (
                    <div className="comment" key={idx}>
                      <div className="One">
                        <div className="ProfilePhoto">
                          {userProfileImage && (
                            <img src={`http://localhost:3000${userProfileImage}`} alt="" />
                          )}
                        </div>
                        <h3>{userName}</h3>
                      </div>
                      <p>{comment}</p>
                    </div>
                  ))
                ) : (
                  <h3 style={{color: "black"}}>No Comments Yet!!</h3>
                )}

              </div>
              : <div className="disable"> </div>
            }
        </div>
      </div>
    </div>
);
}   

export default Card;
