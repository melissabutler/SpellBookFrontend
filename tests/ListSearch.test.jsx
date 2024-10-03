import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import ListSearch from "../src/Components/ListSearch";

describe("ListSearch", function() {

    it('renders theListSearch component', async () => {
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
    
        render(
            <ListSearch />)
        screen.debug();
        
        expect(screen.getByText('Search')).toBeInTheDocument();
      
    });

        it('matches snapshot', () => {
            const { asFragment } = render(<ListSearch />);
            expect(asFragment()).toMatchSnapshot();
        });



})
   