import React, { useContext, useEffect, useState } from "react";

import CurrentUserContext from "../currentUserContext";
import SpellBookApi from "../../api";

const SpellDetail = ({spellIdx}) => {
    const currentUser = useContext(CurrentUserContext)
    const [spell, setSpell] = useState("")

    useEffect ( () => {
        async function getSpell() {
            let spell = await SpellBookApi.getSpellDetails(spellIdx);
            setSpell(spell)
        }
        getSpell();
    })


    return (
    <div>
        {spell.level}{spell.name}
    </div>)
}

export default SpellDetail;