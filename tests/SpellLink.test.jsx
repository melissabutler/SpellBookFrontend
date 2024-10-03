import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import SpellLink from "../src/Components/SpellLink";

describe("SpellLink", function() {

    
        vi.mock('react', async (importOriginal) => {
            const react = await importOriginal('react');
            return {
                ...react,
                useContext: () => ({ currentUser: null}),
                useRef: () => { target: null }
        }})

        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            return {
                ...mod, 
                useNavigate: () => "/",
                BrowserRouter: () => "",
                Link: () => ""
            }
        })
    it('renders the pellLink component', async () => {
        render(
            <SpellLink spell={{index: "acid-arrow", name: "Acid Arrow"}}/>)
        screen.debug();
      
    });

        it('matches snapshot', () => {
            const { asFragment } = render(<SpellLink spell={{index: "acid-arrow", name: "Acid Arrow"}}/>);
            expect(asFragment()).toMatchSnapshot();
        });



})
   