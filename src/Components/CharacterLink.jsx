import React from "react";

import "./CharacterLink.css"

import { Container, Row, Col } from 'react-bootstrap';

const CharacterLink = ({character}) => {

    let charClass = character.char_class[0].toUpperCase() + character.char_class.slice(1);


    return (
            <Container className="CharacterLink">
                <Row>
                    <Col>
                        <h3 className="CharacterLink-name">{character.char_name}</h3>
                    </Col>
                    <Col>
                        <h3>Level {character.lvl} {charClass}</h3>
                    </Col>
                    
                </Row>
                
            </Container>
    )
}

export default CharacterLink;