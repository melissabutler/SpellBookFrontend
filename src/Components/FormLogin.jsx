import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../Hooks/useFields";
import CurrentUserContext from "../currentUserContext";


import { Col, Row,Container } from 'react-bootstrap';

import "./Form.css"

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
        <Container className="Form">
            <Row>
               <h1>Log In</h1> 
            </Row>
            
            <form className="Form-form" onSubmit={handleSubmit}>
                    <Row className="Form-section-label">
                    <label className="Form-label" htmlFor="username">Username</label>
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
                    /></Col>
                    <Col></Col>

                    </Row>

                    <Row className="Form-section-label">
                    <label htmlFor="password" className="Form-label">Password</label>
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
                    /></Col>
                    <Col></Col>
                    </Row>
                <Row>
                    <Col></Col>
                    <Col>
                    <button>Log In</button>
                    </Col>
                    <Col></Col>
                    
                    </Row> 
          
                
                
            </form>


        </Container>
    )
}

export default LoginForm;