import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../currentUserContext";

const LogOut= ({logOut}) => {
    let currentUser = useContext(CurrentUserContext)
    let navigate= useNavigate();

useEffect(function navIfLogout() {
    async function checkUser(){
        logOut();
        navigate('/')
    }
    checkUser();
}, [currentUser])
    


}

export default LogOut;