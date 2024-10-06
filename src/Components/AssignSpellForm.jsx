import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Form.css"

import { Container, Row, Col } from "react-bootstrap"

import CurrentUserContext from "../currentUserContext";
import useFields from "../Hooks/useFields"

const AssignSpellForm = ({assignSpell, spellIdx, getUser}) => {
    let navigate = useNavigate();
    const [characters, setCharacters] = useState([])

    useEffect( () => {
        async function getCharacters() {
            let data = await getUser();
            setCharacters([...data.user.characters])
        }
        getCharacters();
    }, [])

    let [formData, handleChange, resetFormData] = useFields({
        char_id: undefined,
    })

    const handleSubmit = async e => {
        e.preventDefault();
        if(!formData.char_id){
            alert("Please choose a character to assign the spell.")
        }
        let assignedCharacter = {
            "id": parseInt(formData.char_id),
        } 
        
        await assignSpell(spellIdx, assignedCharacter.id)
        navigate(`/characters/${assignedCharacter.id}`)
    }

    return (
        <Container className="Form">
            <form className="Form-form" onSubmit={handleSubmit}>
                <Row className="Form-label">
                    <Col></Col>
                    <Col>
                     <label htmlFor="id">Assign spell to character:</label>
                    </Col>
                   <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                  <select id="char_id" value={formData.char_id} name="char_id" onChange={handleChange}>
                    <option key="placeholder" value="">Select character</option>
                    {characters.map(character => (
                        <option key={character.id} value={character.id}>{character.char_name}</option>
                    ))}
                </select>  
                </Col>
                <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                     <button> Submit</button>
                    </Col>
                    <Col></Col>
                   
                </Row>
                
            </form>

        </Container>
    )
}

export default AssignSpellForm;
