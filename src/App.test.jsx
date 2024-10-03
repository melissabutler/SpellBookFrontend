import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import App from "./App";

describe("App", function() {
    
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
                    useRef: () => { target: null }
            }})

    vi.mock('react-router-dom', async () => {
        const mod = await vi.importActual('react-router-dom');
        return {
            ...mod, 
            useNavigate: () => "/",
            BrowserRouter: () => ""
        }
    })

    it('renders the App component', async () => {
        render(
            <App />)
        screen.debug();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    });



})
   