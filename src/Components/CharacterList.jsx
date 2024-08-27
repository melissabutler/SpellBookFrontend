import React, { useEffect, useContext, useState } from "react";
import CurrentUserContext from "../currentUserContext";
import { Link } from "react-router-dom";

import CharacterCard from "./CharacterCard";

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
        
        <div className="CharacterList">
            
            
            <h1>My Characters</h1>
            <ul className="CharacterList-list">
                {characters.map(character => (
                    <Link key={character.id} to={`/characters/${character.id}`}>
                        <li className="CharacterList-character" key={character.id}>
                            <CharacterCard key={character.id} character={character}/>
                        </li>
                    </Link>
                  ))}
             
            </ul>
            <div className="CharacterList-CreateCharacter">
                <Link className="CharacterList-CreateCharacterLink" to="/characters/create">Create a new Character</Link>
            </div>
        </div>
    )
}

export default CharacterList;