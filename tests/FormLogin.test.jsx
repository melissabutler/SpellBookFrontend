import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import LoginForm from "../src/Components/FormLogin"

describe("LoginForm", function() {
        vi.mock('react', async (importOriginal) => {
            const react = await importOriginal('react');
            return {
                ...react,
                useContext: () => ({ currentUser: null}),
                useRef: () => { target: null }
        }})

        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            const navigate = vi.fn()
            return {
                ...mod, 
                useNavigate: () => navigate,
                BrowserRouter: () => "",
                Link: () => "",

            }
        })
        it('renders the LoginForm component', async () => {
            render(<LoginForm />)
            screen.debug();
            expect(screen.getByText('Username')).toBeInTheDocument();
        
        });

        it('matches snapshot', () => {
            const { asFragment } = render(<LoginForm />);
            expect(asFragment()).toMatchSnapshot();
        });



})
   