import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import CharacterList from "../src/Components/CharacterList";

describe("CharacterList", function() {
        vi.mock('react', async (importOriginal) => {
            const react = await importOriginal('react');
            return {
                ...react,
                useContext: () => ({
                    username: 'u1',
                    email: 'email@email.com',
                    isAdmin: false,
                    characters: [
                        {char_class: "cleric", char_name: "Beebo",id: 1, lvl: 3},
                        {char_class: "cleric", char_name: "Meebo", id: 2,lvl: 3}
                    ]
                })
            
        }})

        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            return {
                ...mod, 
                useNavigate: () => "/",
                Link: () => "/"
            }
        })
    it('renders the CharacterList component', async () => {
        render(<CharacterList />)
        screen.debug();
        expect(screen.getByText('My Characters')).toBeInTheDocument();
      
    });


        it('matches snapshot', () => {
            const { asFragment } = render(<CharacterList />);
            expect(asFragment()).toMatchSnapshot();
        })



})
   