import React from "react";
import { Link } from 'react-router-dom';

import "./SpellLink.css"

const SpellLink = ({spell}) => {
    return (
        <div>
           <Link className="SpellLink-link" key={spell.index} to={`/spells/${spell.index}`}>
            <h5>Level {spell.level}: {spell.name}</h5>
            </Link> 
        </div>
        
    )
}

export default SpellLink;