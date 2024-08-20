import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpellBookApi from "../../api";
import { useNavigate } from "react-router-dom"

import CurrentCharacterContext from "../currentCharacterContext";

import CharacterEditForm from "./CharacterEditForm";
import useToggle from "../Hooks/useToggleState";
import useLocalStorage from "../Hooks/useLocalStorage";
import SpellCard from "./SpellCard";

const CharacterProfile = ({getCharacter, editCharacter, deleteCharacter, unassignSpell}) => {
    const [currentCharacter, setCurrentCharacter] = useLocalStorage("currentCharacter", {})
    const [showEdit, toggleEdit] = useToggle(false)
    const [showDesc, toggleDesc] = useToggle(false)
    const [spells, setSpells] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect( () => {
        async function getData() {
            let data = await getCharacter(id)
            setCurrentCharacter({...data})
            setSpells([...currentCharacter.spells])
        }
        getData();
    }, [spells])


    const handleDelete = e => {
        e.preventDefault();
        deleteCharacter(id)
        navigate('/characters')
    }
    
    const handleEdit = e => {
        e.preventDefault();
        toggleEdit()
    }

    const handleRemove = e => {
        e.preventDefault();
        unassignSpell(e.target.value, currentCharacter.id)
        setSpells([...currentCharacter.spells])
    }

    return (
        <CurrentCharacterContext.Provider value={currentCharacter}>       
         <div className="CharacterProfile"> 
            <h1 className="CharacterProfile-title">{currentCharacter.char_name}: Level {currentCharacter.lvl} </h1>
         {showEdit === true &&
            <div className="CharacterProfile-editForm">
            <CharacterEditForm character={currentCharacter} editCharacter={editCharacter}/>
            </div>
          }
            <div className="CharacterProfile-ability-scores">
                <h3>Strength{currentCharacter.strength}</h3>
                <h3>Dexterity{currentCharacter.dexterity}</h3>
            </div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            
            
            <div className="CharacterProfile-spells">
                {spells.map(spell => (
                    <div key={spell} className="CharacterProfile-spellCard">
                    
                    <SpellCard  spellIdx={spell} details={showDesc} charProfile={true}/>
                    <button onClick={handleRemove} value={spell}>Remove Spell</button>
                    </div>
                ))}

            </div>
          
            <ul>
               
            </ul>
        </div>
        </CurrentCharacterContext.Provider>

    )
}

export default CharacterProfile;