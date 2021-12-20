import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="Main">
      <div className="Title">
        <h1>eVouch</h1>
      </div>
      <div className="Log">
        {!sessionStorage.getItem("token") ? (
          <h4>
            <Link to={"/login"}>Login</Link>| 
            <Link to={"/register"}>Register</Link>
          </h4>
        ) : (
          <h4>
            <Link onClick={() => sessionStorage.removeItem("token")} to={"/login"}>Logout</Link>
          </h4>
        )}
      </div>
    </div>
  );
}

export default Navbar;
