import React, { useState, useEffect } from "react";
import ClassSelect from "./ClassSelect.jsx";

import SpellBookApi from "../../api.js"

import ListSearch from "./ListSearch.jsx";
import SpellDetail from "./SpellDetail.jsx";


const SpellList = () => {
    const [spells, setSpells] = useState([]);
    const [classSearch, setClass] = useState("");
    const [level, setLevel] = useState("");

    /** On change of search terms, page change to show un/filtered list of spells. */
    useEffect ( () => {
        async function getData() {
            //If there is no search parameters
            if( classSearch === "" || level === ""){
                let data = await SpellBookApi.getAllSpells();
                setSpells([...data])
            }
            //If there is level parameter but not class
            if( classSearch === "" && level != ""){
                let data = await SpellBookApi.getFilteredSpells(undefined, level)
                setSpells([...data])
            }
            //if there is class parameter but no level
            if(classSearch != "" && level === ""){
                let data = await SpellBookApi.getFilteredSpells(classSearch, undefined)
                setSpells([...data])
            }
            //if there is both class and level parameter
            if(classSearch != "" && level != ""){
                let data = await SpellBookApi.getFilteredSpells(classSearch, level)
                setSpells([...data])
            }
            
            
            
        }
        getData();
    }, [classSearch, level]);


    const getTerm = (getClass, getLevel) => {
        console.log("in list", getClass, getLevel)
        setClass(getClass);
        setLevel(getLevel);
    }

    return (
        <div>
            Spell List
            <ListSearch getTerm={getTerm}/>
            <ul className="SpellList">
                {spells.map(spell => (
                    //Link
                        <SpellDetail key={spell.index} spellIdx={spell.index} />
                ))}
            </ul>
        </div>
    )
}

export default SpellList;