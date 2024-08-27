import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../Hooks/useFields";
import CurrentUserContext from "../currentUserContext";

import "./LoginForm.css"

const LoginForm = ({login}) => {
    let currentUser = useContext(CurrentUserContext)
    const navigate = useNavigate();
    const [formData, handleChange, resetFormData] = useFields({
        username: "",
        password: ""
    })
    

    const handleSubmit = e => {
        e.preventDefault();
        if(!formData.username || !formData.password){
            alert("Please input valid username and password")
        } else {
            let user = {
            "username": formData.username.toString(),
            "password": formData.password.toString()
            }
            login({user})
        }
    }

    useEffect(function navIfLogin(){
        async function checkUser(){
            if(currentUser){
            navigate('/')}
        }
        checkUser(); 
    }, [currentUser])



    return (
        <div className="LoginForm">
            <h1>Log In</h1>
            <form className="LoginForm-form" onSubmit={handleSubmit}>
                <div className="LoginForm-section">
                    <div className="LoginForm-section-label">
                    <label className="LoginForm-label" htmlFor="username">Username</label>
                    </div>
                    <input 
                        className="LoginForm-input"
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                </div>
                
                <div className="LoginForm-section">
                    <div className="LoginForm-section-label">
                    <label htmlFor="password" className="LoginForm-label">Password</label>
                    </div>
                    <input
                        className="LoginForm-input"
                        id="password"
                        name="password"
                        type="text"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </div>
                <div className="LoginForm-section">
                    <button>Log In</button>
                </div>
                
            </form>


        </div>
    )
}

export default LoginForm;