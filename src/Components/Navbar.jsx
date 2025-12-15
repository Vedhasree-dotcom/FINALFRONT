import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = ({ isHome }) => {
  const { user, logout } = useAuth();

  return (
    <nav className={`navbar ${isHome ? "navbar-home" : "navbar-normal"}`}>
        <h2  className="logo">CraftMate</h2>

       <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        <div className="dropdown">
          <Link to="/crafts">Crafts ▾</Link>
          <div className="dropdown-menu">
            <Link to="/all">All Crafts</Link>
            <Link to="/crafts/category/paper">Paper Crafts</Link>
            <Link to="/crafts/category/home">Home Decor</Link>
            <Link to="/crafts/category/kids">Kids Crafts</Link>
          </div>
        </div>
        <Link to="/findcraft">FindCraft</Link>
      </div>

        {/* {user ? (
          <div className="dropdown">
            <Link to="/profile">Profile ▾</Link> */}
            {/* <div className="dropdown-menu">
              <Link to="/profile">My Profile</Link>
              <Link to="/my-projects">My Projects</Link>
              <Link to="/submit">Submit Craft</Link> */}

              {/* {user.role === "admin" && (
                <Link to="/admin">Admin Dashboard</Link>
              )}

              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div> */} 
    </nav>
  );
};

export default Navbar;
