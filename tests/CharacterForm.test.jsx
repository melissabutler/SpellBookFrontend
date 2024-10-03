import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import CharacterForm from "../src/Components/CharacterForm";

describe("CharacterForm", function() {
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
            useParams: () => ({id: 1}),
            useNavigate: () => "/"
        }
    });

    it('renders the CharacterForm component', async () => {
        render(<CharacterForm />)
        screen.debug();
        expect(screen.getByText('Create a new character!')).toBeInTheDocument();
      
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<CharacterForm />);
        expect(asFragment()).toMatchSnapshot();
    })

})
   