import React, { useEffect, useContext, useState } from "react";
import CurrentUserContext from "../currentUserContext";
import { Link } from "react-router-dom";


import { Container, Row, Col, Button } from 'react-bootstrap';

import CharacterLink from "./CharacterLink";

import "./CharacterList.css"

const CharacterList = () => {
    let currentUser = useContext(CurrentUserContext);
    let [characters, setCharacters] = useState([]);
    

    useEffect( () => {
        async function getData() {
            setCharacters([...currentUser.characters])
        }
        getData();
    }, []);


    return (
        
        <Container className="CharacterList">
            
            <Row>
                <Col>
                    <h1>My Characters</h1>
                </Col>
                
            </Row>
            <Row>
                <Col></Col>
            <Col xs={7}>
                {characters.map(character => (
                    <Link key={character.id} to={`/characters/${character.id}`}>
                            <CharacterLink key={character.id} character={character}/>
                    </Link>
                  ))}
             
            </Col>
            <Col></Col>
            </Row>
            
            
            <Row className="CharacterList-CreateCharacter">
                <Col></Col>
                <Col>
                    <Link className="CharacterList-CreateCharacterLink" to={`create`}>
                    <h3>Create a new character!</h3>
                    </Link>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

export default CharacterList;