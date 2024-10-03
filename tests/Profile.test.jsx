
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import Profile from "../src/Components/Profile";

describe("Profile", function() {
    
        vi.mock('react', async (importOriginal) => {
            const react = await importOriginal('react');
            return {
                ...react,
                useContext: () => ({ currentUser: {
                    username: 'u1',
                    email: 'email@email.com',
                    isAdmin: false,
                    characters: [
                        {
                        char_class: "cleric",
                        char_name: "Beebo",
                        id: 1,
                        lvl: 3
                    },
                    ]
                }})
        }})

        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            return {
                ...mod,
                useNavigate: () => "/",
            }
        })
    it('renders the Profile component', async () => {
        render( <Profile />)
        screen.debug();
      
    });



    it('matches snapshot', () => {
        const { asFragment } = render(<Profile />);
        expect(asFragment()).toMatchSnapshot();
    })



})
   