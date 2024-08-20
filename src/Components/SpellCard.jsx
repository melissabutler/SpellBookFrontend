import React, { useContext, useEffect, useState } from "react";

import CurrentUserContext from "../currentUserContext";
import SpellBookApi from "../../api";

import AssignSpellForm from "./AddSpellForm";

const SpellCard = ({assignSpell, 
                    spellIdx, 
                    details, 
                    charProfile}) => {
    const currentUser = useContext(CurrentUserContext)
    const [spell, setSpell] = useState("")
    const [school, setSchool] = useState("")
    const [cantrip, setCantrip] = useState(false)

    useEffect ( () => {
        async function getSpell() {
          let spell = await SpellBookApi.getSpellDetails(spellIdx);
             
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
        <h2 className="SpellCard-name">{spell.name}</h2>
        {cantrip ? <h3>School of {school} Cantrip</h3> : <h3>Level {spell.level} School of {school} Spell</h3>}
         {details === true && 
         <div className="SpellCard-description">
          <p>{spell.desc}</p>
        </div>
        }
        
        {charProfile === false &&
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