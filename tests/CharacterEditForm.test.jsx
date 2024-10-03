import React from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen} from '@testing-library/react'
import CharacterEditForm from "../src/Components/CharacterEditForm";

describe("CharacterEditForm", function() {
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
            useParams: () => ({
                id: 1
            }),
            useNavigate: () => "/"
        }
    })


    it('renders the CharacterEditForm component', async () => {
        render(<CharacterEditForm />)
        expect(screen.getByText('Edit Character')).toBeInTheDocument();
      
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<CharacterEditForm />);
        expect(asFragment()).toMatchSnapshot();
    })


})
   