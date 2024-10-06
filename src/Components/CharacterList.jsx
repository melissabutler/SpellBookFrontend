import React, { useEffect, useContext, useState } from "react";
import CurrentUserContext from "../currentUserContext";
import { Link } from "react-router-dom";


import { Container, Row, Col, Button } from 'react-bootstrap';

import CharacterLink from "./CharacterLink";

import "./CharacterList.css"
import useToggle from "../Hooks/useToggleState";
import CharacterForm from "./CharacterForm";

const CharacterList = ({getUser, createCharacter}) => {
    let currentUser = useContext(CurrentUserContext);
    const [characters, setCharacters] = useState([]);

    const [showForm, toggleForm] = useToggle(false)

    const handleForm = e => {
        e.preventDefault();
        toggleForm();
    }

    useEffect(() => {
        async function getData() {
            let data = await getUser()
            setCharacters([...data.user.characters])
            console.log(data.user)
        }
        getData();
        
    }, []);

    useEffect(() => {
        async function updateList() {
            let data = await getUser();
            setCharacters([...data.user.characters])
            
        }
        updateList()
    }, [showForm])

    return (
        
        <Container className="CharacterList">
            {showForm === false &&
            <Container>
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
                        <Button onClick={handleForm}>Create a new character!</Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container> 
            }
            {showForm === true &&
            <CharacterForm toggleForm={toggleForm}  createCharacter={createCharacter}/>
            }
            
        </Container>
    )
}

export default CharacterList;