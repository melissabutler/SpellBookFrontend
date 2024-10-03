import React, { useContext } from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Home from "../src/Components/Home";

describe(" Home", function() {

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
            }})
    }})


    it("renders without crashing", async function() {
        render(<Home />)
    })

    it("matches snapshot", function() {
        const { asFragment } = render(<Home />);
        expect(asFragment()).toMatchSnapshot();
    })



})
