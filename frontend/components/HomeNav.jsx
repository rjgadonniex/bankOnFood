import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

function HomeNav() {
  return (
    <Navbar bg="white" expand="md" className="py-2 shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/#" className="fw-bold fs-4">
          <span class="text-primary">bank</span>
          <span class="text-success">On</span>
          <span class="text-primary">Food</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar" className="border-0 shadow-none" />
        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link href="#problem" className="text-dark">
              The Problem
            </Nav.Link>
            <Nav.Link href="#solution" className="text-dark">
              Our Solution
            </Nav.Link>
            <Button as="a" href="/login" className="btn btn-primary rounded-pill px-4 py-2">
              Get Started
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNav;
