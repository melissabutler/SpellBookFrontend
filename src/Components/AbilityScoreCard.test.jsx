import React, { useContext } from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import AbilityScoreCard from "./AbilityScoreCard";

describe("Ability Score Card", function() {


    it("renders without crashing", async function() {
        render(<AbilityScoreCard />)
    })

    it("matches snapshot", function() {
        const { asFragment } = render(<AbilityScoreCard />);
        expect(asFragment()).toMatchSnapshot();
    })



})
