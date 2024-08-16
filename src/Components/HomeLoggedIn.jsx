import React from "react";

const HomeLoggedIn = ({user}) => {
    return (
        <div className="Home-login">
            <h3>Welcome back, {user.username}</h3>
            
        </div>
    )
}

export default HomeLoggedIn;