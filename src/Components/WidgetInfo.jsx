import { useRef } from "react";

import { Col, Row, Overlay, Button, Tooltip, Container } from "react-bootstrap";

import useToggle from "../Hooks/useToggleState";

import "./Widget.css"

function InfoWidget({info, title, altText, size}) {
    const [show, toggleShow] = useToggle(false)
    const target = useRef(null)

    return (
        
        <Container className={`Widget ${size}`}>
            {size === "large" ?
            <Container>
            <Row>
                <Col>
                    <Button ref={target} onClick={() => toggleShow()}>{title}</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>{info}</h4>
                </Col>

                <Overlay target={target.current} show={show} placement="top">
                    <Tooltip id="overlay-altText">
                        {altText}
                    </Tooltip>
                </Overlay>
            </Row>
            </Container>
             : ""}
             {size === "small" ?
             <Container>
             <Row>
                 <Col>
                     <Button ref={target} onClick={() => toggleShow()}>{title}</Button>
                 </Col>
                 <Col>
                     <h4>{info}</h4>
                 </Col>
 
                 <Overlay target={target.current} show={show} placement="top">
                     <Tooltip id="overlay-altText">
                         {altText}
                     </Tooltip>
                 </Overlay>
             </Row>
             </Container>
             : ""}
             {size === "title" ?
             <Container>
                <Row>
                    <Col></Col>
                    <Col>
                    <Button  className="title" ref={target} onClick={() => toggleShow()}>{title}</Button>
                    </Col>
                     <Col></Col>
                </Row>
                <Overlay target={target.current} show={show} placement="top">
                     <Tooltip id="overlay-altText">
                         {altText}
                     </Tooltip>
                 </Overlay>
             </Container>
             : ""}
        </Container>

    )
}

export default InfoWidget;