import axios from "axios";
import { ESModulesRunner } from "vite/runtime";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

const DND_BASE_URL = 'https://www.dnd5eapi.co/api';
/** API CLASS
 * 
 * Static class tying together methods to get/send to the API.
 * Should be only spot to get api-related content.
 */

class SpellBookApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${SpellBookApi.token}`};

        const params = ( method === 'get')
        ? data 
        : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch(err){
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** ///////////////////// DND 5e API SPELL ROUTES (Maybe move to seperate api file?) */

    /**  GET entire list of spells */
    static async getAllSpells() {
        let res = await axios.get(`${DND_BASE_URL}/spells`)
        return res.data.results;
    };

    /** GET filtered list of spells by CLASS, LEVEL, or BOTH */
    static async getFilteredSpells(classType, level) {
        console.log("classtype is", classType);
        if (!classType) {
            console.log("level is", level)
            let res = await axios.get(`${DND_BASE_URL}/spells?level=${level}`)
            return res.data.results;
        } 
        if(!level){
            let res = await axios.get(`${DND_BASE_URL}/classes/${classType}/spells`)
            return res.data.results;
        }

        let res = await axios.get(`${DND_BASE_URL}/classes/${classType}/levels/${level}/spells`)
        return res.data.results;
    }


    // /** GET individual spell data */
    static async getSpellDetails(spell_idx) {
        let res = await axios.get(`${DND_BASE_URL}/spells/${spell_idx}`);
        return res.data;
    }

    /**GET Individual class data */
    static async getClass(classIdx) {
        let res = await axios.get(`${DND_BASE_URL}/classes/${classIdx}`);
        return res;
    }

    /** ////////////////////////////// USER ROUTES */

    /** Register a user */
    static async RegisterUser({newUser}) {
        let res = await this.request('auth/register', newUser, "post")
        SpellBookApi.token = res.token;
        return res;
    }

    /** Log in a user */
    static async LogInUser(user) {
        let res = await this.request('auth/token', user, "post")
        SpellBookApi.token = res.token;
        return res;
    }

    /** Retrieve a user's data */
    static async getUser({token}, username) {
        SpellBookApi.token = token;
        let res = await this.request(`users/${username}`, token.token, "get")
        return res;
    }
    
    /** Edit user data */
    static async editUser({updatedUser}, token, username) {
        SpellBookApi.token = token;
        let res = await this.request(`users/${username}`, updatedUser, "patch")
        return res;
    }

    /** Delete user */
    static async deleteUser(token, username) {
        let res = await this.request(`users/${username}`, "delete")
        return res;

    }


    /** ////////////////////////////////// CHARACTER ROUTES  */


    /** Create a new character and assign to user */
    static async createCharacter(token, newCharacter, username) {
        SpellBookApi.token = token;
        let res = await this.request(`users/${username}/characters`, newCharacter, "post")
        return res;
    }

    /**Retrieve character data */
    static async getCharacter(token, char_id, username) {
        SpellBookApi.token = token;
        let res = await this.request(`users/${username}/characters/${char_id}`, token.token, "get")
        return res.character;
    }

    /** Edit character data */
    static async editCharacter({updatedCharacter}, token, char_id, username) {
        SpellBookApi.token = token;
        let res = await this.request(`users/${username}/characters/${char_id}`, updatedCharacter, "patch")
        return res;
    }

    /** Assign spell to character */
    static async assignSpell(spellIdx, token, char_id, username) {
        SpellBookApi.token = token;
        let res = await this.request(`users/${username}/characters/${char_id}/spell_cards/${spellIdx}`, token.token, "post")
        return res;
    }

    /** Unassign spell from character */
    static async unassignSpell(spellIdx, token, char_id, username) {
        SpellBookApi.token = token;
        let res = await this.request(`users/${username}/characters/${char_id}/spell_cards/${spellIdx}`, token.token, "delete")
        return res;
    }

    /** Delete Character */
    static async deleteCharacter(id, username) {
        let res = await this.request(`users/${username}/characters/${id}`, id, "delete")
        return res;
    }

}

export default SpellBookApi;