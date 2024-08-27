import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import SpellBookApi from "../../api";
import CurrentUserContext from "../currentUserContext";

import "./CharacterCard.css"

const CharacterCard = ({character}) => {


    return (
            <div className="CharacterCard">
                <h3 className="CharacterCard-name">{character.char_name}</h3>
            </div>
    )
}

export default CharacterCard;