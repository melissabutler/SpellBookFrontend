import React from "react";

import "./AbilityScoreCard.css"

const AbilityScoreCard = ({ability, score}) => {
    return (
        <div className="AbilityScoreCard">
            <h3 className="AbilityScoreCard-ability">{ability}</h3>
            <h4 className="AbilityScoreCard-score">{score}</h4>
        </div>
    )
}

export default AbilityScoreCard;