import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CurrentUserContext from "../currentUserContext";
import SpellBookApi from "../../api";

import { Container, Row, Col, Button } from 'react-bootstrap';

import AssignSpellForm from "./AssignSpellForm";
import InfoWidget from "./WidgetInfo";


import "./SpellCard.css"
import SelectWidget from "./WidgetSelect";
import useToggle from "../Hooks/useToggleState";
import SpellLink from "./SpellLink";
import CurrentCharacterContext from "../currentCharacterContext";



function SpellCard({assignSpell,
                    unassignSpell,
                    spellIdx,
                    details, 
                    charProfile,
                    toggleSpellDelete,
                    getUser
                  }) {
    const currentUser = useContext(CurrentUserContext)
    const currentCharacter = useContext(CurrentCharacterContext)

    const { idx } = useParams();

    const [spell, setSpell] = useState("")

    const [detail, toggleDetail] = useToggle(details)

    const [school, setSchool] = useState("")
    const [cantrip, setCantrip] = useState(false)
    const [aoe, setAoe] = useState("")
    const [baseDamage, setBaseDamage] = useState("")
    const [higherLevel, setHigherLevel] = useState("")
    const [levels, setLevels] = useState("")
    const [charOrSlot, setCharOrSlot] = useState("")
    const [dc, setDC] = useState("")

    const handleClick = e => {
      e.preventDefault();
      toggleDetail()
    }

    const handleRemove = async e => {
      e.preventDefault();
      await unassignSpell(spellIdx, currentCharacter.id)
      toggleSpellDelete();
    }


    useEffect ( () => {
        async function getSpell() {
          let spell = "";
          
          /**Get spell information from index, either through url parameter :idx for full spell page, or through prop: spellIdx for character profile list. */
          if(idx) spell = await SpellBookApi.getSpellDetails(idx);
          if(spellIdx) spell = await SpellBookApi.getSpellDetails(spellIdx);

          /**
           * Each spell has a range of potential properties. For example: not every spell inflicts damage. 
           * 
           * To account for the presence (or lack thereof) of certain properties, these checks run. 
           * 
           * If the properties exists, the values are stored.  
           */
          if (spell.area_of_effect) {
          setAoe(spell.area_of_effect.size + " ft " + spell.area_of_effect.type)}

          if(spell.damage) {
            if(spell.damage.damage_at_slot_level){
              let level = spell.level;
              setBaseDamage(spell.damage.damage_at_slot_level[level] + " " + spell.damage.damage_type.name)
              setLevels(Object.keys(spell.damage.damage_at_slot_level))
              setCharOrSlot("slot")
            } else if (spell.damage.damage_at_character_level){
              setBaseDamage(spell.damage.damage_at_character_level[1] + " " + spell.damage.damage_type.name)
              setLevels(Object.keys(spell.damage.damage_at_character_level))
              setCharOrSlot("character")
            }
          }

          if(spell.higher_level.length != 0){
            setHigherLevel(spell.higher_level)
          }

          if(spell.dc) {
            setDC(spell.dc.dc_type.name)
          }
  
          setSpell({...spell})
          setSchool(spell.school.name)

          /** Level 0 spells are known as cantrips. This value is used cosmetically for referring to them as such in the spell detail page. */
          if(spell.level === 0){
            setCantrip(true)
          }
        }
        getSpell();
    }, [detail])

   

  return (
      <Container className="SpellCard-content">

        <Row className="SpellCard-title">
          <Col className="SpellCard-title-name">
          {charProfile ?
          <SpellLink spell={spell} charProfile={true}/>
        :
          <h3>{spell.name}</h3>}
          </Col>
          {cantrip ? 
          <Col className="SpellCard-title-school">School of {school} Cantrip</Col> 
          : <Col className="SpellCard-title-school">Level {spell.level} School of {school} Spell</Col>}

        </Row>
      
        
         {detail === true && 

         <Container className="SpellCard-details">

          <Row className="SpellCard-description">
            <Col></Col>
            <Col xs={7}><p>{spell.desc}</p></Col>
            <Col></Col>
          </Row>

          <Row className="SpellCard-damage">
            {spell.higher_level != 0 ?
              <Col className="SpellCard-higherLevel">
              <InfoWidget info={higherLevel} title="Higher Level" altText="What are the effects when casting this spell at a higher level?" size="large"/>
              </Col>
                  : ""}
            {spell.damage ?
              <Col className="SpellCard-info">
              <InfoWidget info={baseDamage} title="Base Damage" altText="What kind of and How much damage does the spell do at base?" size="large"/>
              </Col> : "" }
                
            {levels != "" ? 
                <Col className="SpellCard-info">
                <SelectWidget options={levels} values={spell.damage} source={charOrSlot} size="large"/> 
                </Col>
            : ""}
          </Row>
            
          <Row className="SpellCard-details">      
                {spell.attack_type ?
                <Col>
                <InfoWidget info={spell.attack_type} title="Attack Type" altText="Is the spell considered a ranged/melee attack?" size="large" /> 
                </Col>
                : ""}

                {spell.dc ? 
                <Col>
                <InfoWidget info={dc} title="Spell DC" altText="What type of save does the target have to make against your spell?"  size="large" /> 
                </Col>
                : ""}
            
                {spell.range ?
                <Col>
                <InfoWidget info={spell.range} title="Range" altText="How far away can you cast the spell?"  size="large" /> 
                </Col>
                : ""}

                {spell.area_of_effect ?
                <Col>
                <InfoWidget info={aoe} title="Area of Effect" altText="What size and shape is the spell effect?"  size="large"/> 
                </Col>
                : ""}
                
                {spell.duration ?
                <Col>
                <InfoWidget info={spell.duration} title="Duration" altText="How long does the spell last?"  size="large" /> 
                </Col>
                : ""}
          
                {spell.casting_time ?
                <Col>
                <InfoWidget info={spell.casting_time}  title="Casting Time" altText="How long does it take to cast the spell?"  size="large" /> 
                </Col>
                : ""}

                {spell.components ? 
                <Col>
                <InfoWidget info={spell.components} title="Components" altText="What does the spell require? Verbal, Somatic, and/or Material?"  size="large"/> 
                </Col>
                : "" }

                {spell.material ?
                <Col>
                <InfoWidget info={spell.material} title="Materials" altText="Does the spell require materials to cast?"  size="large" /> 
                </Col>
                : ""}
          </Row>

          {!currentUser || charProfile === false &&
            <Row>
              <Col className="SpellCard-assignSpell">
              <AssignSpellForm assignSpell={assignSpell} getUser={getUser} spellIdx={spell.index}/>
              </Col>
            </Row>}
    
         </Container>}

         {charProfile === true &&
          <button onClick={handleClick}>
            { detail === false ?
              "Expand" 
            : "Hide" }
          </button>
         }
         {charProfile === true && 
         
         <button onClick={handleRemove}>Remove</button>
         }

     
        
      </Container>)
}

export default SpellCard;

// Get spell by Spell Index

 /** GET /api/spells/:index
 * 
 * {
    "higher_level": [],
    "index": "alarm",
    "name": "Alarm",
    "desc": [
      "You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is mental or audible.",
      "A mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping.",
      "An audible alarm produces the sound of a hand bell for 10 seconds within 60 feet."
    ],
    "range": "30 feet",
    "components": [
      "V",
      "S",
      "M"
    ],
    "material": "A tiny bell and a piece of fine silver wire.",
    "ritual": true,
    "duration": "8 hours",
    "concentration": false,
    "casting_time": "1 minute",
    "level": 1,
    "area_of_effect": {
      "type": "cube",
      "size": 20
    },
    "school": {
      "index": "abjuration",
      "name": "Abjuration",
      "url": "/api/magic-schools/abjuration"
    },
    "classes": [
      {
        "index": "ranger",
        "name": "Ranger",
        "url": "/api/classes/ranger"
      },
      {
        "index": "wizard",
        "name": "Wizard",
        "url": "/api/classes/wizard"
      }
    ],
    "subclasses": [
      {
        "index": "lore",
        "name": "Lore",
        "url": "/api/subclasses/lore"
      }
    ],
    "url": "/api/spells/alarm"
  }

 */