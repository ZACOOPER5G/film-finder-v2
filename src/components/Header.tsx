import { Col, Container, Row } from "react-bootstrap"
import arrow from "../assets/arrow.gif"

export const Header = () => {
    return (
        <Container fluid className="bg-dark p-4" >
            <Row className="row align-items-center justify-content-space-between" >
                <Col className="find-header m-auto" xs={4} sm={4} lg={4} md={4} >
                    <h2>Find a movie</h2>
                    <img className="img-fluid" src={ arrow } />
                    <button className="header-button">Movies</button>
                </Col>
                <Col className="find-header m-auto" xs={4} sm={4} lg={4} md={4}  >
                    <h2>Find a show</h2>
                    <img className="img-fluid" src={ arrow } />
                    <button className="header-button">Shows</button>
                </Col>
            </Row>
        </Container>
    )
}
