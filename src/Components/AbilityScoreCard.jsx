import React from "react";

import "./AbilityScoreCard.css"


import { Container, Row, Col, Button } from 'react-bootstrap';

const AbilityScoreCard = ({ability, score}) => {
    return (
        <Container className="AbilityScoreCard">
        <Row >
            <h4 className="AbilityScoreCard-ability">{ability}</h4>
        </Row>
        <Row>
            <h5 className="AbilityScoreCard-score">{score}</h5>
        </Row>

        </Container>
        
    )
}

export default AbilityScoreCard;