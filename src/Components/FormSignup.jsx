import React, { useContext, useEffect, useState } from "react";
import useFields from "../Hooks/useFields";
import { useNavigate } from "react-router-dom"
import CurrentUserContext from "../currentUserContext";

import checkPassword from "./checkPassword";


import { Col, Row, Container } from 'react-bootstrap';

import "./Form.css"

const SignupForm = ({signUp}) => {
    const currentUser = useContext(CurrentUserContext)
    const [pass, setPass] = useState('')
    
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
            let strength = checkPassword(formData.password.toString())
            console.log(strength)
            if(strength === "Weak") {
                setPass('weak')
            } else if (strength === "Medium"){
                setPass('medium')
            } else if (strength === "Strong"){
                let newUser = {
                "username": formData.username.toString(),
                "password": formData.password.toString(),
                "email": formData.email.toString()
            }
            signUp({newUser})
            }

            
                
            
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
        <Container className="Form">
            <Row>
                <h1>Sign Up</h1>
            </Row>

            <form className="Form-form" onSubmit={handleSubmit}>
                <Row className="Form-section-label">
                    <Col></Col>
                    <Col>
                    <label className="Form-label" htmlFor="username">Username</label>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <input 
                            className="Form-input"
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                    </Col>
                    <Col></Col>
                </Row>
                
                <Row className="Form-section-label">
                    <Col></Col>
                    <Col>
                        <label className="Form-label" htmlFor="password">Password</label>
                    </Col>
                        <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <input 
                        className="Form-input"
                        id="password"
                        name="password"
                        type="text"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        />
                        {pass === "weak" &&
                        <p>Weak strength password, please include uppercase letters, numbers, and symbols.</p>}
                        {pass === "medium" && 
                        <p>Medium strength password, please include uppercase letters, numbers, and symbols. </p>}
                    </Col>
                    <Col></Col>
                </Row>
                    <Row className="Form-section-label">
                        <Col></Col>
                        <Col>
                        <label className="Form-label" htmlFor="username">Email</label>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <input 
                            className="SignupForm-input"
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        </Col>
                        <Col></Col>
                            
                    </Row>

            
            <Row className="Form-section">

                   <Col></Col>
                    <Col>
                    <button>Sign Up</button> 
                    </Col>
                    <Col></Col> 
                
            </Row>
                
            </form>
        </Container>
    )
}

export default SignupForm;