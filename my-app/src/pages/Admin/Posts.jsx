import { useEffect, useState } from "react";
import "./Posts.css";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/showPosts")
      .then(res => {
        console.log(res.data); 
        setPosts(res.data);
      })
      .catch(err => console.error(err.message));
  }, []);

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1 className="posts-title">Posts Management</h1>
        <p className="posts-subtitle">Monitor and moderate user posts</p>
      </div>

      <div className="posts-grid">
        {posts.map(post => (
          <div key={post._id} className="post-card">
            <div className="post-card-header">
              <div className="post-author-info">
                <div className="post-author-avatar">
                  {post.user?.name?.charAt(0)}
                </div>

                <div className="post-author-details">
                  <p className="post-author-name">{post.user?.name}</p>
                  <p className="post-author-tag">@{post.user?.tag}</p>
                </div>
              </div>

              <span className="post-status-badge status-visible">
                Visible
              </span>
            </div>

            <div className="post-card-content">
              <p className="post-description">{post.Descprition}</p>

              {post.Post && (
                <img
                  src={`http://localhost:3000${post.Post}`}
                  alt="post"
                  className="post-media"
                />
              )}
            </div>

            <div className="post-card-footer">
              <p className="post-timestamp">
                {post.createdAt.split("T")[0]}
              </p>

              <div className="post-actions">
                <button className="post-action-btn btn-hide">
                  Hide
                </button>
                <button className="post-action-btn btn-remove">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
