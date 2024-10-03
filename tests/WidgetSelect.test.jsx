import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import SelectWidget from "../src/Components/WidgetSelect";

describe("SelectWidget", function() {

    it('renders the SelectWidget component', async () => {
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
            <SelectWidget options={[1, 2, 3, 4]} values={[1,2,3,4]}/>)
        screen.debug();

    
      
    });

        it('matches snapshot', () => {
            const { asFragment } = render(<SelectWidget options={[1, 2, 3, 4]} values={[1,2,3,4]} />);
            expect(asFragment()).toMatchSnapshot();
        });



})
   