import React, { useContext, useEffect, useState } from "react";

import CurrentUserContext from "../currentUserContext";
import SpellBookApi from "../../api";

import AssignSpellForm from "./AssignSpellForm";
import SpellCardInfo from "./SpellCardInfo";

import useToggle from "../Hooks/useToggleState"

import "./SpellCard.css"
import SpellCardDamage from "./SpellCardDamage";

const SpellCard = ({assignSpell, 
                    spellIdx, 
                    details, 
                    charProfile}) => {
    const currentUser = useContext(CurrentUserContext)

    const [spell, setSpell] = useState("")
    const [school, setSchool] = useState("")
    const [cantrip, setCantrip] = useState(false)
    
    const [aoe, setAoe] = useState("")
    const [baseDamage, setBaseDamage] = useState("")
    const [higherLevel, setHigherLevel] = useState("")
    const [levels, setLevels] = useState("")
    const [charOrSlot, setCharOrSlot] = useState("")
    const [dc, setDC] = useState("")


    useEffect ( () => {
        async function getSpell() {
          let spell = await SpellBookApi.getSpellDetails(spellIdx);
          console.log(spell)

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

          if(spell.level === 0){
            setCantrip(true)
          }
        }
        getSpell();
    }, [])

   

  return (
    <div className="SpellCard">
      <div className="SpellCard-content">
        <div className="SpellCard-title">
          <div className="SpellCard-title-name">{spell.name}</div>
          {cantrip ? 
          <div className="SpellCard-title-school">School of {school} Cantrip</div> 
          : <div className="SpellCard-title-school">Level {spell.level} School of {school} Spell</div>}

        </div>
        
         {details === true && 

         <div className="SpellCard-details">

          <div className="SpellCard-description">
              <p>{spell.desc}</p>
            </div>

            <div className="SpellCard-damage">

              <div className="SpellCard-damage-big">
            

              {spell.damage ? 
              <div className="SpellCard-damage-base">
              <SpellCardInfo  spellInfo={baseDamage} title="Base Damage" altText="What kind of damage does the spell do at base?"/> 
              </div>
              : ""}
              
              {levels != "" ? 
              <div className="SpellCard-damage-base">
                <SpellCardDamage dmgLevels={levels} damage={spell.damage} source={charOrSlot}/> 
                </div>
                : ""}
              </div>

              <div className="SpellCard-damage-small">
                  {spell.attack_type ?
                  <div className="SpellCard-damage-attack-type">
                  <SpellCardInfo className="SpellCard-damage-attack-type" spellInfo={spell.attack_type} title="Attack Type" altText="Is the spell considered a ranged/melee attack?" /> 
                  </div>
                  : ""}

                  {spell.dc ? 
                  <div className="SpellCard-damage-attack-type">
                  <SpellCardInfo className="SpellCard-damage-attack-type" small={true} spellInfo={dc} title="Spell DC" altText="What type of save does the target have to make against your spell?" />
                  </div>
                    : ""}

                    {spell.range ?
                    <SpellCardInfo spellInfo={spell.range}  small={true} title="Range" altText="How far away can you cast the spell?" /> : ""}

                    {spell.area_of_effect ?
                    <SpellCardInfo spellInfo={aoe}  small={true} title="Area of Effect" altText="What size and shape is the spell effect?" /> : ""}
                    
                    {spell.duration ?
                    <SpellCardInfo spellInfo={spell.duration}  small={true} title="Duration" altText="How long does the spell last?" /> : ""}
            

                  {spell.casting_time ?
                  <SpellCardInfo spellInfo={spell.casting_time} small={true}  title="Casting Time" altText="How long does it take to cast the spell?" /> : ""}

                  {spell.components ? 
                  <SpellCardInfo spellInfo={spell.components} small={true} title="Components" altText="What does the spell require? Verbal, Somatic, and/or Material?"/> : "" }

                  {spell.material ?
                  <SpellCardInfo spellInfo={spell.material} small={true} title="Materials" altText="Does the spell require materials to cast?" /> : ""}

              </div>


             

              {/* {spell.higher_level != 0 ?
              <div className="SpellCard-description">
                <h3>Higher Level</h3> 
              <p>{spell.higher_level}</p>
              </div> : "" } */}
              {/* // <SpellCardInfo spellInfo={higherLevel} title="Higher Level" altText="Some spells can be cast using a higher level spell slot. What are the changes?"/> : ""} */}
              
              
            </div>

             
             
           
            
            {/* {spell.higher_level ?
             <SpellCardInfo spellInfo={spell.higher_level} title="Higher Level" altText="If cast at a higher level, what are the effects?" /> : ""} */}

            
            
            
        </div>}

      
        {!currentUser || charProfile === false &&
        <AssignSpellForm assignSpell={assignSpell} spellIdx={spellIdx}/>
        }
        </div>
          
        
    
    </div>)
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