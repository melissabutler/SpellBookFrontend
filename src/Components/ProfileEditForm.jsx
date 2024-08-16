import React, { useContext, useEffect } from "react";

import useFields from "../Hooks/useFields";
import CurrentUserContext from "../currentUserContext";
import { Navigate, useNavigate } from "react-router-dom";

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
        <div className="EditForm">
            <h2>Update User Email</h2>
            <form className="EditForm-form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="EditForm-label">Email</label>
                <input
                    className="EditForm-input"
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    />
                <button>Submit</button>
            </form>
        </div>
    )
     }

export default ProfileEditForm;