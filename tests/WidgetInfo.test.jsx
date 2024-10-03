import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import InfoWidget from "../src/Components/WidgetInfo";

describe("InfoWidget", function() {

    it('renders the InfoWidget component', async () => {
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
    
        render(
            <InfoWidget />)
        screen.debug();

    
      
    });

        it('matches snapshot', () => {
            const { asFragment } = render(<InfoWidget />);
            expect(asFragment()).toMatchSnapshot();
        });



})
   