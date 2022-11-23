import { Container, Navbar as NavBar } from "react-bootstrap";

export const Navbar = () => {
  return (
    <NavBar className="navbar" bg="dark" variant="dark">
      <Container>
        <NavBar.Brand href="#home">
          	<div >
				<h1 className="nav-title" >🍿 Film Finder. 🍿</h1>
			</div>
        </NavBar.Brand>
      </Container>
    </NavBar>
  );
};
