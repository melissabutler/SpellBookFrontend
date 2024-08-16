import React, { useContext, useEffect } from "react";
import useFields from "../Hooks/useFields";
import { useNavigate } from "react-router-dom"
import CurrentUserContext from "../currentUserContext";

// import "./SignupForm.css"

const SignupForm = ({signUp}) => {
    const currentUser = useContext(CurrentUserContext)
    
    const navigate = useNavigate()

    const [formData, handleChange, resetFormData] = useFields({
        username: "",
        password: "",
        email: ""
    })

    const handleSubmit = e => {
        e.preventDefault();
        if(!formData.username || !formData.password || !formData.email){
            alert("Please fill out the form.")
        } else {
            let newUser = {
                "username": formData.username.toString(),
                "password": formData.password.toString(),
                "email": formData.email.toString()
            }
                signUp({newUser})
            
        }   
    }

    useEffect(function navIfSignUp() {
        async function checkUser() {
            if(currentUser){
                navigate('/')
            }
        }
        checkUser();
    }, [currentUser])

    return (
        <div className="SignupForm">
            <h1>Sign Up</h1>
            <form className="SignupForm-form" onSubmit={handleSubmit}>
                <div className="SignupForm-section">
                    <div className="SignupForm-section-label">
                        <label className="SignupForm-label" htmlFor="username">Username</label>
                    </div>
                    <input 
                        className="SignupForm-input"
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                </div>
                
                <div className="SignupForm-section">
                    <div className="SignupForm-section-label">
                        <label className="SignupForm-label" htmlFor="password">Password</label>
                    </div>
                    
                    <input 
                        className="SignupForm-input"
                        id="password"
                        name="password"
                        type="text"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </div>
                
                <div className="SignupForm-section">
                        <div className="SignupForm-section-label">
                        <label className="SignupForm-label" htmlFor="username">Email</label>
                        </div>
                    
                    <input 
                        className="SignupForm-input"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
                

                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignupForm;