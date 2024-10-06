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
import InfoWidget from "./WidgetInfo.jsx";

import abilityscores from "../Modifier.jsx"
import abilities from "../Abilities.jsx"
import proficiencybonus from "../ProficiencyBonus.jsx"

import { Container, Row, Col } from 'react-bootstrap';


import "./CharacterProfile.css"


const CharacterProfile = ({getCharacter, 
                            editCharacter, 
                            deleteCharacter, 
                            unassignSpell, 
                            getClass}) => {

    const [currentCharacter, setCurrentCharacter] = useLocalStorage("currentCharacter", {})

    const [showEdit, toggleEdit] = useToggle(false)
    const [showDesc, toggleDesc] = useToggle(false)
    const [deleteSpell, toggleSpellDelete] = useToggle(false)
    const [assignSpellContext, toggleAssignSpellContext] = useToggle(false)
    
    const [spells, setSpells] = useState([])
    const [classInfo, setClassInfo] = useState([])
    

    const [charClass, setCharClass] = useState("")
    const [spellSave, setSpellSave]= useState('')

    let { id } = useParams();
   
    const navigate = useNavigate();

    /** Get character data at load of page */
    useEffect( () => {
        async function getData() { 
            let data = await getCharacter(id)
            let classData = await getClass(data.char_class);
            setCurrentCharacter({...data})
            setSpells([...data.spells])
            setCharClass(data.char_class[0].toUpperCase() + data.char_class.slice(1))
            setSpellSave( 8 + abilityscores[data[abilities[classData.data.spellcasting.spellcasting_ability.name]]] + proficiencybonus[data.lvl])
            setClassInfo(classData.data.spellcasting.spellcasting_ability.name)
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


    useEffect(() => {
        async function deleteSpellAssignment() {
            let data = await getCharacter(id)
            setSpells([...data.spells])
        }
        deleteSpellAssignment();
    }, [deleteSpell])


    const handleDelete = e => {
        e.preventDefault();
        deleteCharacter(id)
        navigate('/characters')
    }
    
    const handleEdit = e => {
        e.preventDefault();
        toggleEdit();
    }

    const handleDesc = e => {
        e.preventDefault();
        toggleDesc();
    }

    return (
        <CurrentCharacterContext.Provider value={currentCharacter}>   
         <Container className="CharacterProfile">
            <Row>
                <Col className="name-level">
                <h1 className="CharacterProfile-title">{currentCharacter.char_name} | Level {currentCharacter.lvl} {charClass} </h1>
                </Col>
            </Row>
            
            <Row className="CharacterProfile-ability-scores">
                <InfoWidget title="Ability Scores" altText="A character's ability score is a value from 0 - 20 that determines how well they perform certain tasks. This score translates to the modifier, which is added to the dice roll for a task using that particular skill." size="title"/>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="STRENGTH" score={currentCharacter.strength} mod={`${abilityscores[currentCharacter.strength]}`}/>
                </Col>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="DEXTERITY" score={currentCharacter.dexterity} mod={`${abilityscores[currentCharacter.dexterity]}`} />
                </Col>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="CONSTITUTION" score={currentCharacter.constitution} mod={`${abilityscores[currentCharacter.constitution]}`} />
                </Col>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="INTELLIGENCE" score={currentCharacter.intelligence} mod={`${abilityscores[currentCharacter.intelligence]}`} />
                </Col>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="WISDOM" score={currentCharacter.wisdom} mod={`${abilityscores[currentCharacter.wisdom]}`}/>
                </Col>
                <Col>
                <AbilityScoreCard className="CharacterProfile-info" ability="CHARISMA" score={currentCharacter.charisma} mod={`${abilityscores[currentCharacter.charisma]}`}/>
                </Col>
            </Row>

         {showEdit === true &&
                <CharacterEditForm character={currentCharacter}  editCharacter={editCharacter} handleEdit={handleEdit}/>
          }
          {showEdit === false &&
          <Container>
            <Row className="CharacterProfile-showEdit">
                <Col></Col>
                <Col>
                <button onClick={handleEdit}>Edit Character</button>
                </Col>
                <Col>
                <button onClick={handleDelete}>Delete Character</button>
                </Col>
                
                <Col></Col>
            </Row>
          </Container>
        
          }
          <hr></hr>
          
            <Row>
                    <Col xs={5}>
                    <h1>{currentCharacter.char_name}'s Spells</h1> 
                    </Col>

                    <Col>
                    <InfoWidget info={`${classInfo}`} title="Casting Modifier" altText="Each spellcasting class uses a different ability to cast their spells and calculate the spell save DC." size="large" />
                    </Col>

                    <Col>
                    <InfoWidget info={`+${proficiencybonus[currentCharacter.lvl]}`} altText="A character's proficiency bonus is added to skills they are proficient in, and increases as they level up." title="Proficency Bonus" size="large"/>
                    </Col>

                    <Col>
                        <InfoWidget info={spellSave} title="Spell Save DC" altText='The "difficulty class" of the spell, or the number that the target has to beat in order to save against it. Calculated as "8 + Casting Modifier + Proficiency Bonus"' size="large"/>
                    </Col>
                </Row>
            {spells.length != 0 ?
            <Container className="CharacterProfile-spells">
                
                
                {spells.map(spell => (
                    <Row key={spell} className="CharacterProfile-spellCard">
                        <Col></Col>
                        <Col xs={9}>
                        <SpellCard  spellIdx={spell} details={showDesc} charProfile={true} unassignSpell={unassignSpell} toggleEdit={toggleEdit} toggleSpellDelete={toggleSpellDelete}/>
                        </Col>
                    <Col></Col>
                    </Row>
                ))}
            </Container>
            : 
            <Container className="CharacterProfile-spells">
                <Row>
                <h2>No spells assigned yet!</h2>
                </Row>
            </Container> }
            


        </Container>
        </CurrentCharacterContext.Provider>
         

    )
}

export default CharacterProfile;