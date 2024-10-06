import { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import CurrentUserContext from "./currentUserContext";

//Components

import Home from "./Components/Home";
import LoginForm from "./Components/FormLogin";
import SignupForm from "./Components/FormSignup";
import LogOut from "./Components/FormLogOut";
import Profile from "./Components/Profile"

import SpellList from "./Components/SpellList";
import SpellCard from "./Components/SpellCard";

import CharacterList from "./Components/CharacterList";
import CharacterProfile from "./Components/CharacterProfile";

const RoutesList = ({login, 
                        signUp, 
                        logOut,
                        getUser,
                        editUser, 
                        getCharacter, 
                        createCharacter, 
                        editCharacter, 
                        deleteCharacter,
                        assignSpell,
                        unassignSpell,
                        getClass
}) => {
    const currentUser = useContext(CurrentUserContext);

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
                element={<SpellCard assignSpell={assignSpell}
                                    getUser={getUser}
                                    unassignSpell={unassignSpell}
                                    details={true}
                                    charProfile={false}/>}
            />
            <Route 
                path="/characters"
                element={currentUser ? (<CharacterList createCharacter={createCharacter} getUser={getUser}/>) : <Navigate replace to="/"/>}
                /> 


            <Route 
                path="/characters/:id"
                element={ currentUser ? (<CharacterProfile getCharacter={getCharacter} 
                                                            unassignSpell={unassignSpell}
                                                            editCharacter={editCharacter} 
                                                            deleteCharacter={deleteCharacter}
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