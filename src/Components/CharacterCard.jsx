import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import SpellBookApi from "../../api";
import CurrentUserContext from "../currentUserContext";

import "./CharacterCard.css"

import { Container, Row, Col, Button } from 'react-bootstrap';

const CharacterCard = ({character}) => {

    let charClass = character.char_class[0].toUpperCase() + character.char_class.slice(1);
    console.log(character)


    return (
            <Container className="CharacterCard">
                <Row>
                    <Col>
                        <h3 className="CharacterCard-name">{character.char_name}</h3>
                    </Col>
                    <Col>
                        <h3>Level {character.lvl} {charClass}</h3>
                    </Col>
                    
                </Row>
                
            </Container>
    )
}

export default CharacterCard;