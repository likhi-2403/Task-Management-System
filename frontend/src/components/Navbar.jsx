import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaHome,
  FaPlusCircle,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    window.location.href = "/login";
  };

  const activeStyle = (path) =>
    location.pathname === path ? "nav-link active fw-bold text-warning" : "nav-link text-white";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-4" to="/dashboard">
          <FaTasks className="me-2" />
          Task Manager
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link to="/dashboard" className={activeStyle("/dashboard")}>
                <FaHome className="me-1" />
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/create-task"
                className={activeStyle("/create-task")}
              >
                <FaPlusCircle className="me-1" />
                Create Task
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/profile"
                className={activeStyle("/profile")}
              >
                <FaUserCircle className="me-1" />
                Profile
              </Link>
            </li>

            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button
                className="btn btn-danger"
                onClick={logout}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;