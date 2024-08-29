import React, { useRef } from "react";

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Overlay from 'react-bootstrap/Overlay'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'

import useToggle from "../Hooks/useToggleState"

// import "./Tooltip.css"

const SpellCardInfo = ({spellInfo, title, altText, small}) => {

    const [show, toggleShow] = useToggle(false)
    const target = useRef(null)



    return(
        <Row className={`SpellCard-info ${spellInfo}`} name={`${spellInfo}`}
            >
                {small ? 
                <Col>
                    <Row>
                        <Col xs="4">
                            <Button ref={target} onClick={() => toggleShow()}>{title}:</Button>
                        </Col>
                        <Col>
                            <h6>{spellInfo}</h6>
                        </Col>
                        
                    <Overlay target={target.current} show={show} placement="top">
                        <Tooltip id="overlay-altText">
                            {altText}
                        </Tooltip>
                    </Overlay> 
                    </Row>
                    
                </Col>
                :
                <Col>
                    <Col>
                        <Button ref={target} onClick={() => toggleShow()}>{title}</Button>
                    </Col>
                    <Col>
                        <h6>{spellInfo}</h6>
                    </Col>
                
                    <Overlay target={target.current} show={show} placement="top">
                        <Tooltip id="overlay-altText">
                            {altText}
                        </Tooltip>
                        
                    </Overlay>
                </Col>}
                

        </Row>
    )
}

export default SpellCardInfo;