import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import ProfileEditForm from "../src/Components/ProfileEditForm";

describe("ProfileEditForm", function() {

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
            }
        })
    it('renders theProfileEditForm component', async () => {
        render( <ProfileEditForm />)
        screen.debug();
      
    });

        it('matches snapshot', () => {
            const { asFragment } = render(<ProfileEditForm />);
            expect(asFragment()).toMatchSnapshot();
        });



})
   