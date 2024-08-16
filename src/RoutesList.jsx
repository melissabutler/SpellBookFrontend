import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import CurrentUserContext from "./currentUserContext";

//Components

import Home from "./Components/Home";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import LogOut from "./Components/LogOut";
import SpellList from "./Components/SpellList";
import CharacterList from "./Components/CharacterList";
import Profile from "./Components/Profile"
import CharacterForm from "./Components/CharacterForm";
import CharacterProfile from "./Components/CharacterProfile";
import CharacterEditForm from "./Components/CharacterEditForm";

const RoutesList = ({login, signUp, logOut, editUser, getCharacter, createCharacter, editCharacter, deleteCharacter}) => {
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
                element={<LogOut logOut={logOut}/>}
                />

            {/* Spell Routes */}
            <Route 
                path="/spells"
                element={<SpellList />}
                />
            <Route 
                path="/spells/:idx"
                // element={<SpellDetail />}
            />
            <Route 
                path="/characters"
                element={<CharacterList/>}
                /> 

            <Route
                path="/characters/create"
                element={<CharacterForm createCharacter={createCharacter}/>}
            />

            <Route 
                path="/characters/:id"
                element={<CharacterProfile getCharacter={getCharacter} editCharacter={editCharacter} deleteCharacter={deleteCharacter}/>}
                /> 


            <Route 
                path='/profile'
                element={<Profile editUser={editUser}/>}
                />

            
            
        </Routes>
    )
}

export default RoutesList;