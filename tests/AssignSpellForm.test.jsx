import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen} from '@testing-library/react'
import AssignSpellForm from "../src/Components/AssignSpellForm";

describe("AssignSpellForm", function() {
    vi.mock('react', async (importOriginal) => {
                const react = await importOriginal('react');
                return {
                    ...react,
                    useContext: () => ({
                        username: 'u1',
                        email: 'email@email.com',
                        isAdmin: false,
                        characters: [{ char_class: "cleric", char_name: "Beebo", id: 1, lvl: 3 },
                        { char_class: "cleric", char_name: "Melba", id: 2, lvl: 3 }
                        ]
                    }),
                    useRef: () => { target: null }
            }})

        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            return {
                ...mod, 
                useParams: () => ({
                    idx: "acid-arrow"
                }),
                useNavigate: () => "/"
            }
        })
    it('renders the AssignSpellForm component', async () => {
        render(
            <AssignSpellForm />)
        expect(screen.getByText("Assign spell to character:")).toBeInTheDocument();
      screen.debug()
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<AssignSpellForm />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("has user characters in Select character list", async () => {
        render(<AssignSpellForm />)
        expect(screen.getByText("Beebo")).toBeInTheDocument();
        expect(screen.getByText('Melba')).toBeInTheDocument();
    })



})
   