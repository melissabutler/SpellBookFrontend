import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import App from './App'
import CurrentUserContext from "./currentUserContext";

describe("App", function() {


    vi.mock('react', async (importOriginal) => {
        const react = await importOriginal('react');
        return {
            ...react,
            useContext: () => ({ currentUser: {
                username: 'u1',
                email: 'email@email.com',
                isAdmin: false,
                characters: []}}),
                
    }})




    it('renders the App component', async () => {
        render(<App />)
        screen.debug();
      
    });



    it('matches snapshot', () => {
        const { asFragment } = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    })



})
   