import React, { useContext } from "react";

import useFields from "../Hooks/useFields";
import CurrentUserContext from "../currentUserContext";
import { useNavigate } from "react-router-dom";

import "./Form.css"

import { Col, Row, Container } from 'react-bootstrap';

const ProfileEditForm = ({editUser}) => {
    const navigate = useNavigate();
    let currentUser = useContext(CurrentUserContext);

    const [formData, handleChange, resetFormData] = useFields({
        "email": currentUser.email
    })

    const handleSubmit = e => {
        e.preventDefault();

        let updatedUser = {
            "email": formData.email.toString(),
        }
        editUser({updatedUser})
        navigate('/profile')
    }

    return(
        <Container className="Form">
            <Row>
                <h2>Update User Email</h2>
            </Row>
            
            <form className="Form-form" onSubmit={handleSubmit}>
                <Row>
                    <Col></Col>
                    <Col>
                   <label htmlFor="email" className="Form-label">Email</label> 
                   </Col>
                   <Col></Col>
                </Row>
                <Row>
                    <input
                    className="Form-input"
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    /> 
                   
                </Row>
                
         
                <Row>
                    <Col></Col>
                    <Col>
                    <button>Submit</button>
                    </Col>
                    <Col></Col>
                    
                </Row>
                
                
            </form>
        </Container>
    )
     }

export default ProfileEditForm;