import React from "react";

import Select from "react-select";


const options = [

    { value: 'bard', label: 'Bard' },
    { value: 'cleric', label: 'Cleric' },
    { value: 'druid', label: 'Druid' },
    { value: 'paladin', label: 'Paladin' },
    { value: 'ranger', label: 'Ranger' },
    { value: 'sorceror', label: 'Sorceror' },
    { value: 'warlock', label: 'Warlock' },
    { value: 'wizard', label: 'Wizard' }
]

const ClassSelect = () => {
    return (
        <div className="ClassSelect">
            <Select options={options} />
        </div>
    )
}

export default ClassSelect;