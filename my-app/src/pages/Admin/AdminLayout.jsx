import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <div className="admin-left-panel">
        <div className="admin-logo-section">
          <h2>Swish Admin</h2>
          <p>Moderation Panel</p>
        </div>

        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="admin-nav-link">
            Dashboard
          </Link>
          <Link to="/admin/users" className="admin-nav-link">
            Users
          </Link>
          <Link to="/admin/posts" className="admin-nav-link">
            Posts
          </Link>
          <Link to="/admin/communities" className="admin-nav-link">
            Communities
          </Link>
          <Link to="/admin/reports" className="admin-nav-link">
            Reports
          </Link>
          <Link to="/admin/settings" className="admin-nav-link">
            Settings
          </Link>
        </nav>

        <div className="admin-logout-section">
          <Link to="/home" className="admin-logout-link">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="admin-right-panel">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;