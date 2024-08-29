import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import CurrentUserContext from "./currentUserContext";

//Components

import Home from "./Components/Home";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import LogOut from "./Components/LogOut";
import Profile from "./Components/Profile"

import SpellList from "./Components/SpellList";
import SpellDetail from "./Components/SpellDetail"

import CharacterList from "./Components/CharacterList";

import CharacterForm from "./Components/CharacterForm";
import CharacterProfile from "./Components/CharacterProfile";

const RoutesList = ({login, 
                        signUp, 
                        logOut, 
                        editUser, 
                        getCharacter, 
                        createCharacter, 
                        editCharacter, 
                        deleteCharacter,
                        assignSpell,
                        unassignSpell,
                        getClass
}) => {
    const currentUser = useContext(CurrentUserContext)

    return (
        <Routes>
            {/* USER ROUTES */}
            <Route
                path='/'
                element={<Home />}
                />
            <Route
                path='/login'
                element={<LoginForm login={login}/>}
                />
            <Route 
                path='/signup'
                element={<SignupForm signUp={signUp} />}
                />
            <Route 
                path='/logout'
                element={currentUser ? (<LogOut logOut={logOut}/>) : <Navigate replace to="/"/>}
                />

            {/* Spell Routes */}
            <Route 
                path="/spells"
                element={<SpellList />}
                />
            <Route 
                path="/spells/:idx"
                element={<SpellDetail assignSpell={assignSpell}/>}
            />
            <Route 
                path="/characters"
                element={currentUser ? (<CharacterList/>) : <Navigate replace to="/"/>}
                /> 

            <Route
                path="/characters/create"
                element={ currentUser ? (<CharacterForm createCharacter={createCharacter}/>) : <Navigate replace to="/"/>}
            />

            <Route 
                path="/characters/:id"
                element={ currentUser ? (<CharacterProfile getCharacter={getCharacter} 
                                                            editCharacter={editCharacter} 
                                                            deleteCharacter={deleteCharacter}
                                                            unassignSpell={unassignSpell}
                                                            getClass={getClass}
                    />) : <Navigate replace to="/"/>}
                /> 


            <Route 
                path='/profile'
                element={currentUser ? (<Profile editUser={editUser}/>) : <Navigate replace to="/"/>}
                />

            
            
        </Routes>
    )
}

export default RoutesList;