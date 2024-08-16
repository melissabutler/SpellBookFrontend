import React, { useState } from "react";

import ClassSelect from "./ClassSelect";

const ListSearch = ({getTerm}) => {

    const [classSearch, setClass] = useState('');
    const [level, setLevel] = useState('')

    const handleClassChange = (e) => {
        e.preventDefault();
        setClass(e.target.value)
    }

    const handleLevelChange = (e) => {
        e.preventDefault();
        setLevel(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        getTerm(classSearch, level)
    }
    return (
        <div className="ListSearch">
            <form>
                <label>Select a class: </label>
                <select value={classSearch} onChange={handleClassChange}>
                    <option key="all" value="">All</option>
                    <option key="bard" value="bard">Bard</option>
                    <option key="cleric" value="cleric">Cleric</option>
                    <option key="druid" value="druid">Druid</option>
                    <option key="paladin" value="paladin">Paladin</option>
                    <option key="ranger" value="ranger">Ranger</option>
                    <option key="sorceror" value="sorceror">Sorceror</option>
                    <option key="warlock" value="warlock">Warlock</option>
                    <option key="wizard" value="wizard">Wizard</option>
                </select>
                <label>Level: </label>
                <select value={level} onChange={handleLevelChange}>
                    <option key="level-all" value="">All</option>
                    <option key="level-0" value="0">0</option>
                    <option key="level-1" value="1">1</option>
                    <option key="level-2" value="2">2</option>
                    <option key="level-3" value="3">3</option>
                    <option key="level-4" value="4">4</option>
                    <option key="level-5" value="5">5</option>
                    <option key="level-6" value="6">6</option>
                    <option key="level-7" value="7">7</option>
                    <option key="level-8" value="8">8</option>
                    <option key="level-9" value="9">9</option>
                </select>
                <button onClick={handleSubmit}>Search</button>
            </form>
            

        </div>
    )
}

export default ListSearch;