import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SpellList from "../src/Components/SpellList";
import SpellBookApi from "../api";



describe("SpellList", function() {

    it('renders SpellList', () => {
        render(
            <SpellList />
        )
        screen.debug();
    });

    it("matches snapshot", function() {
        const { asFragment } = render(<SpellList />);
        expect(asFragment()).toMatchSnapshot();
    })
        
    
})
