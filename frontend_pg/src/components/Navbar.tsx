import {useState} from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-link">My Todo</Link>
                </div>

                <div className="navbar-menu">
                    {/*<Link to="/" className="navbar-link">Home</Link>*/}
                    <Link to="/profile" className="navbar-link">Profile</Link>
                    <Link to="/login" className="navbar-link">Login</Link>
                </div>

                <div className="hamburger" onClick={toggleDrawer}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>

            {/* Drawer Menu */}
            {drawerOpen && (
                <div className="drawer">
                    <Link to="/" className="drawer-link" onClick={toggleDrawer}>Home</Link>
                    <Link to="/profile" className="drawer-link" onClick={toggleDrawer}>Profile</Link>
                    <Link to="/login" className="drawer-link" onClick={toggleDrawer}>Login</Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;