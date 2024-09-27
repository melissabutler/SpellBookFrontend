import { useState, useRef } from "react";

import { Col, Row, Overlay, Button, Tooltip, Container } from "react-bootstrap";

import useToggle from "../Hooks/useToggleState";

import "./Widget.css"

function SelectWidget({options, values, source, size}) {
    let [select, setSelect] =useState(options[0]);
    let [value, setValue] = useState('');
    const [show, toggleShow] = useToggle(false);
    const target = useRef(null)

    const handleChange = e => {
        e.preventDefault();
        e.target.name = e.target.value;
        setSelect(options[e.target.value])
        setValue(e.target.value)
    }

    return (
        <Container className={`Widget ${size}`}>
                    <Row>
                        <Col>
                        <Button ref={target} onClick={() => toggleShow()}>Casting Level</Button>
                        <Overlay target={target.current} show={show} placement="top">
                            <Tooltip id="overlay-altText">
                                How does the damage increase as the casting level increases?
                            </Tooltip>
                        </Overlay>
                        </Col>
                    </Row>
                   
                
                <Row>
                    <Col>
                     <select className="select" id="select" name="select" value={select} onChange={handleChange}>
                        {options.map(option => (
                        <option key={option} value={option}>{option}</option>)
                    )}
                    </select>
                    </Col>
                </Row>
            <Row>
                {source === "slot" ? 
                <h4 className="damage">{values.damage_at_slot_level[value]} {values.damage_type.name}</h4> : ""}
                {source === "character" ? 
                <h4 className="damage">{values.damage_at_character_level[value]} {values.damage_type.name}</h4> : ""}
                
            </Row>
        </Container>
    )

}

export default SelectWidget;