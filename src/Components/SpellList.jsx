import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import SpellBookApi from "../../api.js"

import ListSearch from "./ListSearch.jsx";
import SpellCard from "./SpellCard.jsx";
import SpellLink from "./SpellLink.jsx";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./SpellList.css"


const SpellList = () => {
    const [spells, setSpells] = useState([]);
    const [classSearch, setClass] = useState("");
    const [level, setLevel] = useState("");
    const [searchTerm, setSearchTerm] = useState('');

    /** On change of search terms, page change to show un/filtered list of spells. */
    useEffect ( () => {
        async function getData() {
            //If there is no search parameters
            if( classSearch === "" || level === ""){
                let data = await SpellBookApi.getAllSpells();
                setSpells([...data])
            }
            //If there is level parameter but not class
            if( classSearch === "" && level != ""){
                let data = await SpellBookApi.getFilteredSpells(undefined, level)
                setSpells([...data])
            }
            //if there is class parameter but no level
            if(classSearch != "" && level === ""){
                let data = await SpellBookApi.getFilteredSpells(classSearch, undefined)
                setSpells([...data])
            }
            //if there is both class and level parameter
            if(classSearch != "" && level != ""){
                let data = await SpellBookApi.getFilteredSpells(classSearch, level)
                setSpells([...data])
            }
            
            
            
        }
        getData();
    }, [classSearch, level]);


    const getTerm = (getClass, getLevel) => {
        console.log("in list", getClass, getLevel)
        setClass(getClass);
        setLevel(getLevel);
    }

    const getSearchTerm = (newTerm) => {
        setSearchTerm(newTerm)
    }

    const filteredData = spells.filter((spell) => {
        if(searchTerm === "") {
            return spell;
        } else {
            return spell.name.toLowerCase().match(searchTerm)
        }
    })

    return (
        <Container className="SpellList">
            <Row>
                <Col></Col>
                <Col>
                <h1 className="SpellList-title">Spell List</h1>
                </Col>
                <Col></Col>
                
            </Row>
            
            <Row className="SpellList-search">
                <Col></Col>
                <Col xs={7}>
                    <ListSearch className="SpellList-search-select" getSearchTerm={getSearchTerm} getTerm={getTerm}/>
                </Col>
                <Col></Col>
            </Row>
            <Row className="SpellList-list">
                <Col></Col>
                <Col>
                {filteredData.map(spell => (
                    <SpellLink key={spell.index} spell={spell} />
                ))}
                </Col>
                <Col></Col>
                
            </Row>
            
        </Container>
    )
}

export default SpellList;