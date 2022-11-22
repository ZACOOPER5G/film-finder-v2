import { Col, Row } from "react-bootstrap"
import arrow from "../assets/arrow.gif"

export const Header = () => {
    return (
        <Row>
            <Col>
                <h2>Find a movie</h2>
                <img src={ arrow } />
            </Col>
            <Col>
                <h2>Find a show</h2>
                <img src={ arrow } />
            </Col>
        </Row>
    )
}
