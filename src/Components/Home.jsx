import React, { useContext } from "react";
import CurrentUserContext from "../currentUserContext";

import HomeLoggedIn from "./HomeLoggedIn";
import HomeNoLogin from "./HomeNoLogin";

// import "./Home.css"

const Home = () => {
    let currentUser = useContext(CurrentUserContext);

    let page = "";

    if(!currentUser){
        page = <HomeNoLogin />
    } else {
        page = <HomeLoggedIn user={currentUser}/>
    }

    return (
        <div className="Home">
            <div className="Home-content">
                <h1 className="Home-title">Dungeons and Dragons 5th Edition SpellBook</h1>
                {page}
            </div>
            
        </div>
    )
}

export default Home;