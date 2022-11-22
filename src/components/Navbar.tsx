import { Container, Navbar as NavBar } from "react-bootstrap";

export const Navbar = () => {
  return (
    <NavBar bg="dark" variant="dark">
    <Container>
      <NavBar.Brand href="#home">
        <h1>🍿 Film Finder 🍿</h1>
      </NavBar.Brand>
    </Container>
  </NavBar>
  )
};