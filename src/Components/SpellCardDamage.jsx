import React, { useEffect, useState, useRef } from "react";


import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Overlay from 'react-bootstrap/Overlay'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'

import useToggle from "../Hooks/useToggleState";

import "./SpellCardDamage.css"
import CurrentUserContext from "../currentUserContext";

const SpellCardDamage = ({dmgLevels, damage, source}) => {
    let [select, setSelect] = useState(dmgLevels[0])
    let [dmg, setDmg] = useState('')
    let [charOrSlot, setCharOrSlot] = useState('')
    const [show, toggleShow] = useToggle(false)
    const target = useRef(null)

    useEffect(() => {
        async function getSource() {
            setCharOrSlot(source)
        }
        getSource();
    }, [])
   
    const handleChange = e => {
        e.preventDefault();
        e.target.name = e.target.value;
        setSelect(dmgLevels[e.target.value])
        setDmg(e.target.value)
    }

    
    return (
        <Row className="SpellCard-info">
            <Row>
                    {source === "slot" ?
                    <Col>
                        <Button ref={target} onClick={() => toggleShow()}>Slot Level</Button>
                        <Overlay target={target.current} show={show} placement="top">
                            <Tooltip id="overlay-altText">
                                How does the damage increase?
                            </Tooltip>
                        </Overlay>
                    </Col>
                    : ""}
                    {source === "character" ?
                    <Col>
                        <Button ref={target} onClick={() => toggleShow()}>Character Level</Button>
                        <Overlay target={target.current} show={show} placement="top">
                            <Tooltip id="overlay-altText">
                                How does the damage increase?
                            </Tooltip>
                        </Overlay>
                    
                    </Col>
                    : ""}
                
                <Col>
                     <select className="level-select" id="dmg-level" name="dmg-level" value={select} onChange={handleChange}>
                        {dmgLevels.map(level => (
                        <option key={level} value={level}>{level}</option>)
                    )}
                    </select>
                </Col>
            </Row>
            <Row>
            {source === "slot" ?
                <h4 className="damage">{damage.damage_at_slot_level[dmg]} {damage.damage_type.name}</h4> : ""}
                {source === "character" ?
                <h4 className="damage">{damage.damage_at_character_level[dmg]} {damage.damage_type.name}</h4> : ""}
                
            </Row>   
                
                
                
                

        </Row>
    )
}

export default SpellCardDamage;