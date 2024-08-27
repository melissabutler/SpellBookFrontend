import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpellBookApi from "../../api";
import { useNavigate } from "react-router-dom"

import CurrentCharacterContext from "../currentCharacterContext";

import CharacterEditForm from "./CharacterEditForm";
import useToggle from "../Hooks/useToggleState";
import useLocalStorage from "../Hooks/useLocalStorage";
import SpellCard from "./SpellCard";
import AbilityScoreCard from "./AbilityScoreCard";

import "./CharacterProfile.css"

const CharacterProfile = ({getCharacter, editCharacter, deleteCharacter, unassignSpell}) => {
    const [currentCharacter, setCurrentCharacter] = useLocalStorage("currentCharacter", {})
    const [showEdit, toggleEdit] = useToggle(false)
    const [showDesc, toggleDesc] = useToggle(false)
    const [change, toggleChange] = useToggle(true)
    const [spells, setSpells] = useState([])

    let { id } = useParams();
   
    const navigate = useNavigate();

    /** Get character data at load of page */
    useEffect( () => {
        async function getData() { 
            let data = await getCharacter(id)
            setCurrentCharacter({...data})
            setSpells([...currentCharacter.spells])
            toggleChange();
        }
        getData();
    }, [])

    /** When Edit status toggles, update character  */
    useEffect( () => {
        async function updateCharacter() {
            let data = await getCharacter(id)
            setCurrentCharacter({...data})

        }
        updateCharacter();
    }, [showEdit])

    let charClass = currentCharacter.char_class[0].toUpperCase() + currentCharacter.char_class.slice(1)


    const handleDelete = e => {
        e.preventDefault();
        deleteCharacter(id)
        navigate('/characters')
    }
    
    const handleEdit = e => {
        e.preventDefault();
        toggleEdit();
        toggleChange();
    }

    const handleRemove = e => {
        e.preventDefault();
        unassignSpell(e.target.value, currentCharacter.id)
        setSpells([...currentCharacter.spells])
        toggleChange()
    }
    
    const handleDesc = e => {
        e.preventDefault();
        toggleDesc();
        toggleChange();
    }

    return (
        <CurrentCharacterContext.Provider value={currentCharacter}>       
         <div className="CharacterProfile"> 
            <h1 className="CharacterProfile-title">{currentCharacter.char_name}</h1>
            <h2 className="CharacterProfile-class-level"> Level {currentCharacter.lvl} {charClass} </h2>

         {showEdit === true &&
            <div className="CharacterProfile-editForm">
                <CharacterEditForm character={currentCharacter} toggleEdit={toggleEdit} editCharacter={editCharacter}/>
                <button onClick={handleEdit}>Hide Edit</button>
            </div>
          }

            <div className="CharacterProfile-ability-scores">
                <AbilityScoreCard className="CharacterProfile-info" ability="Strength" score={currentCharacter.strength} />
                <AbilityScoreCard className="CharacterProfile-info" ability="Dexterity" score={currentCharacter.dexterity} />
                <AbilityScoreCard className="CharacterProfile-info" ability="Constitution" score={currentCharacter.constitution} />
                <AbilityScoreCard className="CharacterProfile-info" ability="Intelligence" score={currentCharacter.intelligence} />
                <AbilityScoreCard className="CharacterProfile-info" ability="Wisdom" score={currentCharacter.wisdom} />
                <AbilityScoreCard className="CharacterProfile-info" ability="Charisma" score={currentCharacter.charisma} />
            </div>

            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete Character</button>
            
            
            <div className="CharacterProfile-spells">
                <h1>{currentCharacter.char_name}'s Spells</h1>
                {spells.map(spell => (
                    <div key={spell} className="CharacterProfile-spellCard">
                    
                    <SpellCard  spellIdx={spell} details={showDesc} charProfile={true}/>
                    <button onClick={handleDesc}>Expand</button>
                    <button onClick={handleRemove} value={spell}>Remove Spell</button>
                    </div>
                ))}
            </div>


        </div>
        </CurrentCharacterContext.Provider>

    )
}

export default CharacterProfile;