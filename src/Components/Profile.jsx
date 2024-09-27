import React, { useContext } from "react";
import CurrentUserContext from "../currentUserContext";
import ProfileEditForm from "./ProfileEditForm";


import { Col, Row, Container } from 'react-bootstrap';


const Profile = ({editUser}) => {
    let currentUser = useContext(CurrentUserContext)
    return (
        <Container>
            <Row>
                <h1 style={{textAlign: "center"}}>{currentUser.username}</h1>
            </Row>
            <Row>
               <ProfileEditForm editUser={editUser} /> 
            </Row>
            
            
        </Container>
    )
}

export default Profile;