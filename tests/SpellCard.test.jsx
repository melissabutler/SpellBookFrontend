import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import SpellCard from "../src/Components/SpellCard";

describe("SpellCard", function() {

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
                }}),
        }})
        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            return {
                ...mod, 
                useParams: () => ({
                    idx: "acid-arrow"
                })
            }
        })
    
    it('renders the SpellCard component', async () => {
        render(<SpellCard />)
        screen.debug();
      
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<SpellCard />);
        expect(asFragment()).toMatchSnapshot();
        })



})
   