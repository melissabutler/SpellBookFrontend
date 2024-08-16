import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpellBookApi from "../../api";
import { useNavigate } from "react-router-dom"

import CurrentCharacterContext from "../currentCharacterContext";

import CharacterEditForm from "./CharacterEditForm";
import useToggle from "../Hooks/useToggleState";
import useLocalStorage from "../Hooks/useLocalStorage";

const CharacterProfile = ({getCharacter, editCharacter, deleteCharacter}) => {
    const [currentCharacter, setCurrentCharacter] = useLocalStorage("currentCharacter", {})
    const [showEdit, toggleEdit] = useToggle(false)
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect( () => {
        async function getData() {
            let data = await getCharacter(id)
            setCurrentCharacter({...data})
        }
        getData();
    }, [])

    const handleDelete = e => {
        e.preventDefault();
        deleteCharacter(id)
        navigate('/characters')
    }
    
    const handleEdit = e => {
        e.preventDefault();
        toggleEdit()
    }

    

    return (
        <CurrentCharacterContext.Provider value={currentCharacter}>        <div className="CharacterProfile">
            <h1>Character Profile</h1>
            <h1>{currentCharacter.char_name}</h1>
            <h3>{currentCharacter.char_class}</h3>
            <div className="CharacterProfile-ability-scores">
                <h3>Strength{currentCharacter.strength}</h3>
                <h3>Dexterity{currentCharacter.dexterity}</h3>
            </div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            {showEdit ? <CharacterEditForm character={currentCharacter} editCharacter={editCharacter}/> : ""}
            
            <ul>
               
            </ul>
        </div>
        </CurrentCharacterContext.Provider>

    )
}

export default CharacterProfile;