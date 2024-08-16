import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import SpellBookApi from "../../api";
import CurrentUserContext from "../currentUserContext";

const CharacterCard = ({character}) => {
    let currentUser = useContext(CurrentUserContext);


    return (
            <div className="CharacterCard">
                <h3>{character.char_name}</h3>
                {character.char_class}
            </div>
    )
}

export default CharacterCard;