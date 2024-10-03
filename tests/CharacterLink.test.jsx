import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import CharacterLink from "../src/Components/CharacterLink";

describe("CharacterLink", function() {
        vi.mock('react', async (importOriginal) => {
            const react = await importOriginal('react');
            return {
                ...react,
                useContext: () => ({ currentUser: {
                    username: 'u1',
                    email: 'email@email.com',
                    isAdmin: false,
                    characters: [
                        {char_class: "cleric", char_name: "Beebo",
                        id: 1,
                        lvl: 3
                    },
                    {
                        char_class: "cleric",
                        char_name: "Beebo",
                        id: 2,
                        lvl: 3
                    }
                    ]
                }})
        }})

        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            return {
                ...mod, 
                useParams: () => ({
                    id: 1,
                }),
                useNavigate: () => "/"
            }
        })
    it('renders the CharacterLink component', async () => {
        render(<CharacterLink character={ {char_class: "cleric", char_name: "Beebo", id: 2, lvl: 3}}/>)
        screen.debug();
      
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<CharacterLink character={ {char_class: "cleric", char_name: "Beebo", id: 2, lvl: 3}}/> );
        expect(asFragment()).toMatchSnapshot();
    })

    it("displays input info", async () => {
        render(<CharacterLink character={ {char_class: "cleric", char_name: "Beebo", id: 2, lvl: 3}}/>)

        expect(screen.getByText("Level 3 Cleric")).toBeInTheDocument();
        expect(screen.getByText("Beebo")).toBeInTheDocument();
    })


})
   