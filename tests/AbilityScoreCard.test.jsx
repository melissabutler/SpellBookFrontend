import React, { useContext } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AbilityScoreCard from "../src/Components/AbilityScoreCard";

describe("Ability Score Card", function() {


    it("renders without crashing", async function() {
        render(<AbilityScoreCard />)
    })

    it("matches snapshot", function() {
        const { asFragment } = render(<AbilityScoreCard />);
        expect(asFragment()).toMatchSnapshot();
    })

    it("displays supplied information", function() {
        render(<AbilityScoreCard ability="charisma" score="10" mod="+2"/>)
        
        expect(screen.getByText('charisma')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('+2')).toBeInTheDocument();
    })



})
