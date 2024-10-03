import React, { useContext } from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import HomeNoLogin from "../src/Components/HomeNoLogin";

describe(" HomeNoLogin", function() {

    vi.mock('react', async (importOriginal) => {
        const react = await importOriginal('react');
        return {
            ...react,
            useContext: () => ({ currentUser: "null" }),
            useRef: () => { target: null }
    }})

    vi.mock('react-router-dom', async () => {
        const mod = await vi.importActual('react-router-dom');
        return {
            ...mod,
            Link: () => ""
        }
    })


    it("renders without crashing", async function() {
        render(<HomeNoLogin />)
    })

    it("matches snapshot", function() {
        const { asFragment } = render(<HomeNoLogin />);
        expect(asFragment()).toMatchSnapshot();
    })



})
