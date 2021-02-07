import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Navigation.css";

import userContext from "./userContext";
// import "./Navigation.css";

/** Navigation component to show different dog names
 * 
 * Props:
 * - currentUser
 * 
 * App -> Navigation
 */

function Navigation({ logout }) {
  const currentUser = useContext(userContext);
  const history = useHistory();

  function handleClick() {
    logout();
    history.push("/");
  }

  let navLinks;

  // <> </> React.Fragment Component useful for grouping things together
  // without having the JSX syntax yell at us 
  if (currentUser) {
    navLinks = (
      <>
        <li className="nav-item">
          <NavLink key="companies" exact to="/companies" className="nav-link">Companies</NavLink>
        </li>
        <li className="nav-item">
          <NavLink key="jobs" exact to="/jobs" className="nav-link">Jobs</NavLink>
        </li>
        <li className="nav-item">
          <NavLink key="profile" exact to="/profile" className="nav-link">Profile</NavLink>
        </li>
        <li className="nav-item">
          <button onClick={handleClick} className="nav-link btn btn-link nav-link-btn">Logout {currentUser.username}</button>
        </li>
      </>);
  } else {
    navLinks = (
      <>
        <li className="nav-item">
          <NavLink key="login" exact to="/login" className="nav-link">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink key="signup" exact to="/signup" className="nav-link">Signup</NavLink>
        </li>
      </>);
  }

  return (
    <nav className="Nav navbar navbar-expand-lg navbar-light bg-light">
      <NavLink key="home" exact to="/" className="navbar-brand">Jobly</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {navLinks}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;