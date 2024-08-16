import React from "react";
import { Link } from "react-router-dom";

const HomeNoLogin = () => {
    return (
        <div className="Home-nologin">
            <h1> Not logged in</h1>
            <button className="Home-button"><Link to="/login">Log In</Link></button>
            <button className="Home-button"><Link to="/signup">Sign Up</Link></button>
       
        </div>
    )   
}

export default HomeNoLogin;