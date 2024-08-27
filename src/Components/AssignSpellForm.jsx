import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AssignSpellForm.css"

import CurrentUserContext from "../currentUserContext";
import useFields from "../Hooks/useFields"

const AssignSpellForm = ({assignSpell, spellIdx}) => {
    let navigate = useNavigate();
    const currentUser = useContext(CurrentUserContext)
    const [characters, setCharacters] = useState([])
    const [character, setCharacter] = useState([])

    useEffect( () => {
        async function getCharacters() {
            setCharacters([...currentUser.characters])
        }
        getCharacters();
    }, [])

    let [formData, handleChange, resetFormData] = useFields({
        char_id: undefined,
    })

    const handleSubmit = e => {
        e.preventDefault();
        console.log("formData", formData.char_id)
        if(!formData.char_id){
            alert("Please choose a character to assign the spell.")
        }
        let assignedCharacter = {
            "id": parseInt(formData.char_id),
        } 
        
        console.log(spellIdx, assignedCharacter.id)
        assignSpell(spellIdx, assignedCharacter.id)
        navigate(`/characters/${assignedCharacter.id}`)
    }

    return (
        <div className="AssignSpellForm">
            <form className="AssignSpellForm-form" onSubmit={handleSubmit}>
                <div className="AssignSpellForm-label">
                    <label htmlFor="id">Assign spell to character:</label>
                </div>
                <select id="char_id" value={formData.char_id} name="char_id" onChange={handleChange}>
                    <option key="placeholder" value="">Select character</option>
                    {characters.map(character => (
                        <option key={character.id} value={character.id}>{character.char_name}</option>
                    ))}
                </select>
                <button> Submit</button>
            </form>

        </div>
    )
}

export default AssignSpellForm;

{/* <form onSubmit={handleSubmit}>
            <label htmlFor="addSpell"> Add Spell to</label>
            <select id="character" value={character}>
              {characters.map(character => (
                <option key={character.id} value={character.id}>{character.char_name}</option>
              ))}
            </select>
              <button>Add Spell</button>
          </form>
        </div> */}