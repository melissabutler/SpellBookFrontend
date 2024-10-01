import React from "react";
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import "./SpellLink.css"

const SpellLink = ({spell, charProfile}) => {
    return (
        <Container>
           <Link className="SpellLink-link" key={spell.index} to={`/spells/${spell.index}`}>
           {charProfile === true ?
           <h5>{spell.name}</h5>
            :
            <h5>Level {spell.level}: {spell.name}</h5>
            }
            
            </Link> 
        </Container>
        
    )
}

export default SpellLink;