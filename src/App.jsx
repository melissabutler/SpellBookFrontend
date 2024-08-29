import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

//Create currentUserContext
import CurrentUserContext from './currentUserContext';

import RoutesList from './RoutesList';
import NavBar from './Components/NavBar';
import SpellBookApi from '../api';
import useLocalStorage from './Hooks/useLocalStorage';

// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);

  
  /** On load of page, check if user token or change to user token.
   * if yes: set currentUser throughout app
  */
 useEffect(function checkUserLogin() {
  async function getData() {
    if(token) {
      let decodedToken = jwtDecode(token);
      let username = decodedToken.username;
      let res = await SpellBookApi.getUser({token}, username);
      setCurrentUser(res.user)
    }
  }
  getData();
 }, [token]);

 /** When login is called, call API. If successfull, set token */

 async function login({user}) {
  try {
    let res = await SpellBookApi.LogInUser(user)
    setToken(res.token)
  } catch(err){
    alert(err)
  }
 }

 /** When logout is called, set token and currentUser to null */

 const logOut = () => {
  try {
    setToken(null);
    setCurrentUser(null);
  } catch(err) {
    alert(err)
  }
 }

 /** When signup form is called, Call API to register a new user. If successful, set token */
async function signUp({newUser}) {
  try {
    let res = await SpellBookApi.RegisterUser({newUser})
    setToken(res.token)
  } catch(err) {
    alert(err)
  }
}

/** When editUse form is submitted in profile, call API with updatedUser.
 * If successful, update currentUser
 */

async function editUser({updatedUser}) {
  try {
    let user = currentUser;
    let res = await SpellBookApi.editUser({updatedUser}, token, user.username);
    setCurrentUser(res.user)
  } catch(err){
    alert(err)
  }
}

/** When successful createCharacter form is submitted, call API with new Character
 * if successful, add Character
 */
async function createCharacter(newCharacter) {
  try {
    console.log(newCharacter)
    let res = await SpellBookApi.createCharacter(token, newCharacter);
    return res;
  } catch(err){
    alert(err);
  }
}

/** Get information on a single character */

async function getCharacter(char_id) {
  try {
    // console.log("in app token", token)
    let res = await SpellBookApi.getCharacter(token, char_id)
    return res;
  } catch(err) {
    alert(err);
  }
}
/** When successful updateCharacter form is submitted, call API with updatedCharacter
 * if successful, update Character
 */

async function editCharacter({updatedCharacter}, char_id) {
  try {
    console.log("In app", updatedCharacter, char_id)
    let res = await SpellBookApi.editCharacter({updatedCharacter}, token, char_id)
    return res;
  } catch(err) {
    alert(err);
  }
}

/** When delete is called, call API to delete a character. */
async function deleteCharacter(char_id) {
  try {
    let res = await SpellBookApi.deleteCharacter(char_id)
  } catch(err) {
    alert(err);
  }
}

/** When spell is assigned to character, call API to update character */
async function assignSpell(spellIdx, char_id){
  try {
    let res = await SpellBookApi.assignSpell(spellIdx, token, char_id)
  } catch(err) {
    alert(err);
  }
}

async function unassignSpell(spellIdx, char_id){
  try {
    let res = await SpellBookApi.unassignSpell(spellIdx, token, char_id)
  } catch(err) {
    alert(err);
  }
}

async function getClass(classIdx) {
  try {
    let res = await SpellBookApi.getClass(classIdx)
    return res;
  } catch(err) {
    alert(err);
  }
}


  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <NavBar />
          <RoutesList login={login} 
                      signUp={signUp} 
                      logOut={logOut} 
                      editUser={editUser} 
                      getCharacter={getCharacter} 
                      createCharacter={createCharacter} 
                      editCharacter={editCharacter} 
                      deleteCharacter={deleteCharacter} 
                      assignSpell={assignSpell}
                      unassignSpell={unassignSpell}
                      getClass={getClass}/>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
