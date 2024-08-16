import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./NavBar.css"

import CurrentUserContext from "../currentUserContext";

function NavBar() {
    let currentUser = useContext(CurrentUserContext);
    let links = [];

    //If not logged in, show these links
    if(!currentUser) {
        links = [
            <Link className="NavBar-link user" key="login" to='/login'>Login</Link>,
            <Link className="NavBar-link user" key="signup" to='/signup'>Sign Up</Link>
        ]
        
    } else {
        links = [
        <Link className="NavBar-link content" key="characters" to="/characters">My Characters</Link>,
        <Link className="NavBar-link user" key="logout" to="/logout">Log Out</Link>,
        <Link className="NavBar-link user" key="profile" to="/profile">Profile</Link>
       
]
    }
    // If logged in, show these links
    return (
        <nav className="NavBar">
            <Link className="NavBar-link home" key="home" to="/">DnD 5e SpellBook</Link>
            <Link className="NavBar-link content" key="spells" to="/spells">Spells</Link>
            {links}
        </nav>
    )
}

export default NavBar;