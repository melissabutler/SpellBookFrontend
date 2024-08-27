import React, { useContext, useEffect, useState } from "react";
import useFields from "../Hooks/useFields";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../currentUserContext";
import useToggle from "../Hooks/useToggleState";

import "./CharacterForm.css"

const CharacterForm = ({createCharacter}) => {
    const currentUser = useContext(CurrentUserContext);
    const [newCharacter, setNewCharacter] = useState([])
    const [characterMade, toggleCharacterMade] = useToggle(false)

    const navigate = useNavigate();

    const [formData, handleChange, resetFormData] = useFields({
        char_name: "",
        char_class: "",
        lvl: "",
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        
    })

    const handleSubmit = e => {
        e.preventDefault();
        if(!formData.char_name || !formData.char_class || !formData.lvl){
            alert("Please fill out character name, class, and level in order to proceed with character creation.")
        } else {
            let newCharacter = {
                "char_name": formData.char_name.toString(),
                "char_class": formData.char_class.toString(),
                "lvl": parseInt(formData.lvl),
                "strength": parseInt(formData.strength),
                "dexterity": parseInt(formData.dexterity),
                "constitution": parseInt(formData.constitution),
                "intelligence": parseInt(formData.intelligence),
                "wisdom": parseInt(formData.wisdom),
                "charisma": parseInt(formData.charisma)
            }
           
            newCharacter.username = currentUser.username;
            setNewCharacter(newCharacter)
            toggleCharacterMade();
        }
    }

    useEffect( () => {
        async function navAfterCreate() {
            if(characterMade) {
                let data = await createCharacter(newCharacter)
                toggleCharacterMade(false);
                navigate(`/characters/${data.newCharacter.id}`)
            }

        }
        navAfterCreate();
    }, [characterMade])

    /** This piece condenses the options list for numeric stats, in this case character level and ability scores.
     * As they both are a range from 1-20, they can share this list. 
    */
    let statRange = [];

    for(let i = 1; i <= 20; i++){
        let key = "level-" + i;
        statRange.push(<option key={key} value={i} >{i}</option>)
    }


    return (
        <div className="CharacterForm">
            <h1> Create a new character!</h1>
            <form className="CharacterForm-form" onSubmit={handleSubmit}>

                <div className="CharacterForm-section">
                    <div className="CharacterForm-section-label">
                        <label className="CharacterForm-label" htmlFor="char_name">Character Name</label>
                    </div>
                    <input
                        className="CharacterForm-input"
                        id="char_name"
                        name="char_name"
                        type="text"
                        value={formData.char_name}
                        onChange={handleChange}
                        placeholder="Character Name"
                    />
                </div>

                <div className="CharacterForm-section">
                    <div className="CharacterForm-section-label">
                        <label className="CharacterForm-label" htmlFor="char_class">Character Class</label>
                    </div>
                    <select id="char_class" value={formData.char_class} name="char_class" onChange={handleChange}>
                        <option key="placeholder" value="">Select a class</option>
                        <option key="bard" value="bard">Bard</option>
                        <option key="cleric" value="cleric">Cleric</option>
                        <option key="druid" value="druid">Druid</option>
                        <option key="paladin" value="paladin">Paladin</option>
                        <option key="ranger" value="ranger">Ranger</option>
                        <option key="sorceror" value="sorceror">Sorceror</option>
                        <option key="warlock" value="warlock">Warlock</option>
                        <option key="wizard" value="wizard">Wizard</option>
                    </select>
                </div>

                <div className="CharacterForm-section">
                    <div className="CharacterForm-section-label">
                        <label className="CharacterForm-label" htmlFor="lvl">Character Level</label>
                    </div>
                <select id="lvl" value={formData.lvl} name="lvl" onChange={handleChange}>
                    <option key="placeholder" value="">Level</option>
                    {statRange}
                </select>
                </div>
{/* 
             ABILITY SCORES ///////////////////// */}
            <div className="CharacterForm-section-ability">
                <div className="CharacterForm-section">
                    <div className="CharacterForm-section-label">
                        <label className="CharacterForm-label" htmlFor="strength">Strength</label>
                    </div>
                <select id="strength" value={formData.strength} name="strength" onChange={handleChange}>
                    <option key="placeholder" value="">STR</option>
                    {statRange}
                </select>
                </div>

                <div className="CharacterForm-section">
                    <div className="CharacterForm-section-label">
                        <label className="CharacterForm-label" htmlFor="dexterity">Dexterity</label>
                    </div>
                <select id="dexterity" value={formData.dexterity} name="dexterity" onChange={handleChange}>
                    <option key="placeholder" value="">DEX</option>
                    {statRange}
                </select>
                </div>

                <div className="CharacterForm-section">
                    <div className="CharacterForm-section-label">
                        <label className="CharacterForm-label" htmlFor="constitution">Constitution</label>
                    </div>
                <select id="constitution" value={formData.constitution} name="constitution" onChange={handleChange}>
                    <option key="placeholder" value="">CON</option>
                    {statRange}
                </select>
                </div>

                <div className="CharacterForm-section">
                    <div className="CharacterForm-section-label">
                        <label className="CharacterForm-label" htmlFor="intelligence">Intelligence</label>
                    </div>
                <select id="intelligence" value={formData.intelligence} name="intelligence" onChange={handleChange}>
                    <option key="placeholder" value="">INT</option>
                    {statRange}
                </select>
                </div>

                <div className="CharacterForm-section">
                    <div className="CharacterForm-section-label">
                        <label className="CharacterForm-label" htmlFor="wisdom">Wisdom</label>
                    </div>
                <select id="wisdom" value={formData.wisdom} name="wisdom" onChange={handleChange}>
                    <option key="placeholder" value="">WIS</option>
                    {statRange}
                </select>
                </div>

                <div className="CharacterForm-section">
                    <div className="CharacterForm-section-label">
                        <label className="CharacterForm-label" htmlFor="charisma">Charisma</label>
                    </div>
                <select id="charisma" value={formData.charisma} name="charisma" onChange={handleChange}>
                    <option key="placeholder" value="">CHA</option>
                    {statRange}
                </select>
                </div>
            </div>
        <button> Create a Character</button>
            </form>

        </div>
    )
}

export default CharacterForm;