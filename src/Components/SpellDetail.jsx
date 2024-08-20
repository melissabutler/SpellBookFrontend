import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CurrentUserContext from "../currentUserContext";
import SpellBookApi from "../../api";
import SpellCard from "./SpellCard";

const SpellDetail = ({assignSpell}) => {
    const [spell, setSpell] = useState("")
    const { idx } = useParams();


    return (
    <div>
        <SpellCard assignSpell={assignSpell} spellIdx={idx} details={true} charProfile={false} />
    </div>)
}

export default SpellDetail;