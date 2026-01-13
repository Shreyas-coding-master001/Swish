import { useState, useEffect } from "react";
import "./Card.css";
import axios from "axios";

// function Card({ description, media, author, likes,reposts, createdAt }){
function Card(props){

  if (!props.post || !props.post.user) {
    return null;
  }

    const [postType,setPost] = useState(true);
    const [value,setvalue] = useState("");
    const userId = props.post?.user?._id || null;

    const [isliked, setlike] = useState(
      userId && props.post.likedAcc
        ? !props.post.likedAcc.includes(userId)
        : false
    );
    const [isfollowed, setfollowed] = useState({
      followed:
      props.post?.user?.followedAcc && userId
        ? props.post.user.followedAcc.includes(userId)
        : false

    });

    const [commentButton , setComments] = useState({
      comments :  props.post.Comments,
      isClcked : false
    })
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

    const Followhandle =  async function(){
      
if (!userId) return;

      await axios.post(
        `http://localhost:3000/post/follow/${userId}`,
        {},
        { withCredentials: true }
      )
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
      await axios.post(`http://localhost:3000/post/comment/${props.post._id}`,{value}, {withCredentials: true})
      .then(res => {setComments(prev => ({
        ...prev,
        comments: res.data
        }))
      })
      .catch(err => console.error(err));
    }

    const image = props.post.Post;
    return (
    <div className="Post">
      <div className="top">
        <div className="One">
          <div className="ProfilePhoto">
            {props.post.user.profileImage && <img src={`http://localhost:3000${props.post.user.profileImage}`} />}
          </div>
          <h3>{props.post.user?.name}</h3>
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
          <video src={`http://localhost:3000${image}`} autoPlay muted />
        )}

        <div className={isliked ? "LikedAni" : "disable"}>
          <i className="ri-heart-fill"></i>
        </div>

        {/* <p>{createdAt}</p> */}
      </div>

      <div className="bottom">
        <div className="Icons">
          <div className="likeButton" onClick={Likedhandle}>
            {isliked ? <i className="ri-heart-fill"></i> : <i className="ri-heart-line"></i>}
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
            <h6>{props.post.reposts?.length || 0} repost</h6>
          </div>

        </div>

          <p>{likeCount} Likes</p>

        <div className="Desciption">
            <h3>Describe: <span>{props.post.Descprition}</span></h3>
              <form onSubmit={handleCommentSend} className="One">
                <input type="text" placeholder="Add a Comment..."  onChange={e => {
                  setvalue(e.target.value);
                }} value={value} />
                <button type="submit" onClick={handleCommentSend}><i className="ri-send-plane-2-fill"></i></button>
              </form>

            {commentButton.isClcked? 
              <div className="commentBox">
                {props.post.Comments && props.post.Comments.length > 0 ? (
                  props.post.Comments.map((comment, idx) => (
                    <div className="comment" key={idx}>
                      <div className="One">
                        <div className="ProfilePhoto">
                          {props.post.user.profileImage && (
                            <img src={`http://localhost:3000${props.post.user.profileImage}`} alt="" />
                          )}
                        </div>
                        <h3>{props.post.user?.name}</h3>
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

export default Card
