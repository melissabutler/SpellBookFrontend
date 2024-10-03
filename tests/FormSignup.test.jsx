import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import SignupForm from "../src/Components/FormSignup";

describe("SignupForm", function() {

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
            }
        })
    it('renders the LoginForm component', async () => {
        render(
            <SignupForm />)
        screen.debug();
      
    });

        it('matches snapshot', () => {
            const { asFragment } = render(<SignupForm />);
            expect(asFragment()).toMatchSnapshot();
        });



})
   