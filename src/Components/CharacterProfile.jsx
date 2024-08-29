import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SpellBookApi from "../../api";
import { useNavigate } from "react-router-dom"

import CurrentCharacterContext from "../currentCharacterContext";

import CharacterEditForm from "./CharacterEditForm";
import useToggle from "../Hooks/useToggleState";
import useLocalStorage from "../Hooks/useLocalStorage";
import SpellCard from "./SpellCard";
import AbilityScoreCard from "./AbilityScoreCard";


import { Container, Row, Col, Button, Overlay, Tooltip } from 'react-bootstrap';

import SpellCardInfo from "./SpellCardInfo";

import "./CharacterProfile.css"

const CharacterProfile = ({getCharacter, editCharacter, deleteCharacter, unassignSpell, getClass}) => {
    const [currentCharacter, setCurrentCharacter] = useLocalStorage("currentCharacter", {})
    const [showEdit, toggleEdit] = useToggle(false)
    const [showDesc, toggleDesc] = useToggle(false)
    const [change, toggleChange] = useToggle(true)
    const [spells, setSpells] = useState([])
    const [classInfo, setClassInfo] = useState([])

    const [show, toggleShow] = useToggle(false)
    const target = useRef(null)


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

    useEffect (() => {
        async function getData() {
            let data = await getClass(currentCharacter.char_class)
            setClassInfo(data.data.spellcasting.spellcasting_ability.name)
        }
        getData()
    }, [currentCharacter])
    

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
         <Container className="CharacterProfile">
            <Row>
                <Col>
                <h1 className="CharacterProfile-title">{currentCharacter.char_name}</h1>
                <h2 className="CharacterProfile-class-level"> Level {currentCharacter.lvl} {charClass} </h2>
                </Col>
                <Col xs={3}>
                    <Container className="CharacterProfile-castingMod">
                        <Row>
                            <Col>
                            <Button ref={target} onClick={() => toggleShow()}>Casting Modifier </Button>
                            <Overlay target={target.current} show={show} placement="top">
                                <Tooltip id="overlay-castingMod">
                                    Each spellcasting class uses a different ability to cast their spells.
                                </Tooltip>
                            </Overlay>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                            <h5>{classInfo}</h5>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </Col>
               
            
            </Row>
            
            <Row className="CharacterProfile-ability-scores">
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="Strength" score={currentCharacter.strength} />
                </Col>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="Dexterity" score={currentCharacter.dexterity} />
                </Col>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="Constitution" score={currentCharacter.constitution} />
                </Col>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="Intelligence" score={currentCharacter.intelligence} />
                </Col>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="Wisdom" score={currentCharacter.wisdom} />
                </Col>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="Charisma" score={currentCharacter.charisma} />
                </Col>
            </Row>
         {showEdit === true &&
            <div className="CharacterProfile-editForm">
                <CharacterEditForm character={currentCharacter} toggleEdit={toggleEdit} editCharacter={editCharacter}/>
                <button onClick={handleEdit}>Hide Edit</button>
            </div>
          }

            

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


        </Container>
        </CurrentCharacterContext.Provider>

    )
}

export default CharacterProfile;