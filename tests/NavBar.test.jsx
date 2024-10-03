import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import NavBar from "../src/Components/NavBar";

describe("NavBar", function() {

    
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
    it('renders theNavBar component', async () => {
        render( <NavBar />)
        screen.debug();
      
    });

        it('matches snapshot', () => {
            const { asFragment } = render(<NavBar />);
            expect(asFragment()).toMatchSnapshot();
        });



})
   