import React from "react";

import "./AbilityScoreCard.css"


import { Container, Row, Col } from 'react-bootstrap';

const AbilityScoreCard = ({ability, score, mod}) => {
    return (
        <Container className="AbilityScoreCard">
        <Row >
            <h4 className="AbilityScoreCard-ability">{ability}</h4>
        </Row>
        <Row>
            <Col></Col>
            <Col xs={7}>
            <h5 className="AbilityScoreCard-score">{score}</h5>
            </Col>
            <Col></Col>
            
        </Row>
        <Row>
            <Col></Col>
            <Col>
            <h6 className="AbilityScoreCard-mod">{mod}</h6>
            </Col>
            <Col></Col>
            
        </Row>

        </Container>
        
    )
}

export default AbilityScoreCard;