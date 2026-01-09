import { useState } from "react";
import "./Posts.css";

function Posts() {
  const [posts] = useState([
    {
      id: 1,
      author: "John Doe",
      authorTag: "johndoe",
      description: "Amazing campus event today! #college #events",
      timestamp: "2 hours ago",
      status: "Visible",
      reports: 0
    },
    {
      id: 2,
      author: "Alice Smith",
      authorTag: "alicesmith",
      description: "Check out this new research paper on AI",
      timestamp: "5 hours ago",
      status: "Visible",
      reports: 2
    },
    {
      id: 3,
      author: "Bob Johnson",
      authorTag: "bobjohnson",
      description: "Join our study group this weekend!",
      timestamp: "1 day ago",
      status: "Hidden",
      reports: 0
    },
    {
      id: 4,
      author: "Emma Wilson",
      authorTag: "emmawilson",
      description: "Beautiful sunset at the campus today",
      timestamp: "2 days ago",
      status: "Visible",
      reports: 0
    },
    {
      id: 5,
      author: "Mike Brown",
      authorTag: "mikebrown",
      description: "Looking for project partners for CS101",
      timestamp: "3 days ago",
      status: "Visible",
      reports: 1
    },
    {
      id: 6,
      author: "Sarah Davis",
      authorTag: "sarahdavis",
      description: "Excited to share my latest photography work!",
      timestamp: "4 days ago",
      status: "Visible",
      reports: 0
    }
  ]);

  const handleHidePost = (postId) => {
    console.log("Hide post:", postId);
  };

  const handleRemovePost = (postId) => {
    console.log("Remove post:", postId);
  };

  const handleViewReports = (postId) => {
    console.log("View reports:", postId);
  };

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1 className="posts-title">Posts Management</h1>
        <p className="posts-subtitle">Monitor and moderate user posts</p>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-card-header">
              <div className="post-author-info">
                <div className="post-author-avatar">
                  {post.author.charAt(0)}
                </div>
                <div className="post-author-details">
                  <p className="post-author-name">{post.author}</p>
                  <p className="post-author-tag">@{post.authorTag}</p>
                </div>
              </div>
              <span
                className={`post-status-badge ${
                  post.status === "Visible"
                    ? "status-visible"
                    : "status-hidden"
                }`}
              >
                {post.status}
              </span>
            </div>

            <div className="post-card-content">
              <p className="post-description">{post.description}</p>
              <div className="post-media-placeholder">
                <p>Media Content</p>
              </div>
            </div>

            <div className="post-card-footer">
              <div className="post-meta">
                <p className="post-timestamp">{post.timestamp}</p>
                {post.reports > 0 && (
                  <span className="post-reports-badge">
                    {post.reports} {post.reports === 1 ? "report" : "reports"}
                  </span>
                )}
              </div>

              <div className="post-actions">
                <button
                  className="post-action-btn btn-hide"
                  onClick={() => handleHidePost(post.id)}
                >
                  {post.status === "Visible" ? "Hide" : "Unhide"}
                </button>
                <button
                  className="post-action-btn btn-remove"
                  onClick={() => handleRemovePost(post.id)}
                >
                  Remove
                </button>
                {post.reports > 0 && (
                  <button
                    className="post-action-btn btn-reports"
                    onClick={() => handleViewReports(post.id)}
                  >
                    View Reports
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;