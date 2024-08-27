import React, { useEffect, useState } from "react";

import "./SpellCardDamage.css"

import "./Tooltip.css"

const SpellCardDamage = ({dmgLevels, damage, source}) => {
    let [select, setSelect] = useState(dmgLevels[0])
    let [dmg, setDmg] = useState('')
    let [charOrSlot, setCharOrSlot] = useState('')

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
        <div className="SpellCard-info">
            <div className="tooltip">
                {source === "slot" ?
                <label htmlFor="level-select">Slot Level</label> : ""}
                {source === "character" ?
                <label htmlFor="level-select">Character Level</label> : ""}
                <select className="level-select" id="dmg-level" name="dmg-level" value={select} onChange={handleChange}>
                    {dmgLevels.map(level => (
                    <option key={level} value={level}>{level}</option>)
                )}
                </select>
                {source === "slot" ?
                <div>{damage.damage_at_slot_level[dmg]} {damage.damage_type.name}</div> : ""}
                {source === "character" ?
                <div>{damage.damage_at_character_level[dmg]} {damage.damage_type.name}</div> : ""}
                
                <div className="tooltip-text">How does the damage increase?</div>
            </div>

        </div>
    )
}

export default SpellCardDamage;