import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useFields from "../Hooks/useFields";
import CurrentCharacterContext from "../currentCharacterContext";


import { Container, Row, Col } from 'react-bootstrap';

const CharacterEditForm = ({editCharacter, toggleEdit, handleEdit}) => {
    const navigate = useNavigate();
    let character = useContext(CurrentCharacterContext)
    let { id }= useParams();

    const [formData, handleChange, resetFormData] = useFields({
        char_name: character.char_name,
        char_class: character.char_class,
        lvl: character.lvl,
        strength: character.strength,
        dexterity: character.dexterity,
        constitution: character.constitution,
        intelligence: character.intelligence,
        wisdom: character.wisdom,
        charisma: character.charisma,
})

    const handleSubmit = async e => {
        e.preventDefault();
  
        let updatedCharacter = {
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
        
        await editCharacter({updatedCharacter}, id)
        toggleEdit();
    }


     /** This piece condenses the options list for numeric stats, in this case character level and ability scores.
     * As they both are a range from 1-20, they can share this list. 
    */
     let statRange = [];

     for(let i = 0; i <= 20; i++){
         let key = "level-" + i;
         statRange.push(<option key={key} value={i} >{i}</option>)
     }

    return (
        <Container className="CharacterForm">
            <Row>
                <h1>Edit Character</h1>
            </Row>
             <form className="CharacterForm-form" >
            <Row>
                    <Col className="CharacterForm-section">
                        <h5 htmlFor="char_name" className="CharacterForm-h4">Character Name</h5>
                    
                        <input
                            className="CharacterForm-input"
                            id="char_name"
                            name="char_name"
                            type="text"
                            value={formData.char_name}
                            onChange={handleChange}
                            placeholder="Character Name"
                        />
                    </Col>
                    
                    <Col className="CharacterForm-section">
                        <h5 className="CharacterForm-h4" htmlFor="char_class">Character Class</h5>
                   
                    <select id="char_class" value={formData.char_class} name="char_class" onChange={handleChange}>
                        <option key="placeholder" value="">Select a class</option>
                        <option key="bard" value="bard">Bard</option>
                        <option key="cleric" value="cleric">Cleric</option>
                        <option key="druid" value="druid">Druid</option>
                        <option key="paladin" value="paladin">Paladin</option>
                        <option key="ranger" value="ranger">Ranger</option>
                        <option key="sorcerer" value="sorcerer">Sorcerer</option>
                        <option key="warlock" value="warlock">Warlock</option>
                        <option key="wizard" value="wizard">Wizard</option>
                    </select>
                    </Col>
                    <Col className="CharacterForm-section">
                        <h5 className="CharacterForm-h4" htmlFor="lvl">Character Level</h5>
                        
                        <select id="lvl" value={formData.lvl} name="lvl" onChange={handleChange}>
                            <option key="placeholder" value="">Level</option>
                            {statRange}
                        </select>
                    </Col>
            </Row>

            <Row className="CharacterForm-section-ability">
                <Col className="CharacterForm-section">
                        <h4 className="CharacterForm-h4" htmlFor="strength">Strength</h4>
                <select className="ability-score" value={formData.strength} name="strength" onChange={handleChange}>
                    <option key="placeholder" value="">STR</option>
                    {statRange}
                </select>
                </Col>

                <Col className="CharacterForm-section">
                        <h4 className="CharacterForm-h4" htmlFor="dexterity">Dexterity</h4>
                <select className="ability-score" value={formData.dexterity} name="dexterity" onChange={handleChange}>
                    <option key="placeholder" value="">DEX</option>
                    {statRange}
                </select>
                </Col>

                <Col className="CharacterForm-section">
                        <h4 className="CharacterForm-h4" htmlFor="constitution">Constitution</h4>
                <select className="ability-score" value={formData.constitution} name="constitution" onChange={handleChange}>
                    <option key="placeholder" value="">CON</option>
                    {statRange}
                </select>
                </Col>

                <Col className="CharacterForm-section">
                        <h4 className="CharacterForm-h4" htmlFor="intelligence">Intelligence</h4>
                <select className="ability-score" value={formData.intelligence} name="intelligence" onChange={handleChange}>
                    <option key="placeholder" value="">INT</option>
                    {statRange}
                </select>
                </Col>

                <Col className="CharacterForm-section">
                        <h4 className="CharacterForm-h4" htmlFor="wisdom">Wisdom</h4>
                <select className="ability-score" value={formData.wisdom} name="wisdom" onChange={handleChange}>
                    <option key="placeholder" value="">WIS</option>
                    {statRange}
                </select>
                </Col>

                <Col className="CharacterForm-section">
                        <h4 className="CharacterForm-h4" htmlFor="charisma">Charisma</h4>
                <select className="ability-score" value={formData.charisma} name="charisma" onChange={handleChange}>
                    <option key="placeholder" value="">CHA</option>
                    {statRange}
                </select>
                </Col>
           
            </Row>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleEdit}>Hide Edit</button>
            </form>
            
        </Container>
    )
    

}

export default CharacterEditForm;