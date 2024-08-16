import React, { useContext } from "react";
import CurrentUserContext from "../currentUserContext";
import ProfileEditForm from "./ProfileEditForm";

const Profile = ({editUser}) => {
    let currentUser = useContext(CurrentUserContext)
    return (
        <div>
            <h1>{currentUser.username}</h1>
            <ProfileEditForm editUser={editUser} />
            
        </div>
    )
}

export default Profile;