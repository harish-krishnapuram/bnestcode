import { Link, useNavigate } from "react-router-dom";
import {
  FaCode,
  FaBook,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";
import { useAuth } from "../context/Authcontext";

const Navbar = () => {
  const navigate = useNavigate();
  const {logout} = useAuth()

  const logoutUser = () => {
    logout()

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
        >
          <FaCode size={24} />
          BnestCode
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item mx-2">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link" to="/problems">
                <FaBook className="me-1" />
                Problems
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link" to="/progress">
                <FaChartLine className="me-1" />
                Progress
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link" to="/profile">
                <FaUserCircle className="me-1" />
                Profile
              </Link>
            </li>

            <li className="nav-item ms-lg-3">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={logoutUser}
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
};

export default Navbar;