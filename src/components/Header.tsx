import { Col, Container, Row } from "react-bootstrap";
import arrow from "../assets/arrow.gif";

export const Header = (props: any) => {
  return (
    <Container fluid className="bg-dark p-4">
		<Row className="row align-items-center justify-content-space-between">
			<Col className="find-header m-auto" xs={4} sm={4} lg={4} md={4}>
				<h2>Find a <em className="movie">movie</em></h2>
				<img className="img-fluid" src={arrow} alt="arrow" />
				<button className="header-button" onClick={() => {
					props.setMovie(!props.movie);
					props.setShow(false);
				}} >Movies</button>
			</Col>
			<Col className="find-header m-auto" xs={4} sm={4} lg={4} md={4}>
				<h2>Find a <em className="show">show</em></h2>
				<img className="img-fluid" src={arrow} alt="arrow" />
				<button className="header-button" onClick={() => {
					props.setMovie(false);
					props.setShow(!props.show);
				}}>Shows</button>
			</Col>
		</Row>
    </Container>
  );
};
