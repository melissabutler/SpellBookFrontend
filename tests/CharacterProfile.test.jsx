import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import CharacterProfile from "../src/Components/CharacterProfile";
import useLocalStorage from "../src/Hooks/useLocalStorage";

describe("CharacterProfile", function() {
        vi.mock('react', async (importOriginal) => {
            const react = await importOriginal('react');
            return {
                ...react,
                useContext: () => (
                    { char_class: "cleric", char_name: "Beebo", id: 1, lvl: 3 }
                ),
                useRef: () => { target: null }
        }})


        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            const navigate = vi.fn()
            return {
                ...mod, 
                useNavigate: () => navigate,
                BrowserRouter: () => "",
                useParams: () => ({id: 1}),
                Link: () => ""
            }
        })

    
        it('renders the CharacterProfile component', async () => {
            render(<CharacterProfile />)
            screen.debug();
            expect(screen.getByText('Beebo')).toBeInTheDocument();
        
        });

        it('matches snapshot', () => {
            const { asFragment } = render(<CharacterProfile />);
            expect(asFragment()).toMatchSnapshot();
        });



})
   