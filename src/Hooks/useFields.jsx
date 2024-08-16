import React, { useState } from "react";

const useFields = (initialState) => {
    const [formData, setFormData] = useState(initialState);

// when user inputs change, form will update
    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: [e.target.value]
        }))
    }
    
    const resetFormData = () => {
        setFormData(initialState)
    }

    return [formData, handleChange, resetFormData]
}

export default useFields;