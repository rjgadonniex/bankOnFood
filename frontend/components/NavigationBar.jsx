import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function NavigationBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // check if a user is logged in when the navbar loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // logging out
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar fixed="top" bg="white" expand="md" className="py-2 shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/" className="fw-bold fs-4">
          <Logo />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar" className="border-0 shadow-none" />
        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link href="/#problem" className="text-dark">The Problem</Nav.Link>
            <Nav.Link href="/#solution" className="text-dark">Our Solution</Nav.Link>
            
            {/* Always show a link to the map */}
            <Nav.Link href="/search" className="text-dark fw-medium">Find a Pantry</Nav.Link>

            {/* rendering based on Auth State */}
            {user ? (
              <NavDropdown
                title={
                  <div 
                    className="text-primary fw-bold d-inline-flex align-items-center"
                    style={{ gap: '6px', transform: 'translateY(1px)' }}
                  >
                    <PersonCircle size={20} /> 
                    <span>{user.name}</span>
                  </div>
                }
                id="user-nav-dropdown"
                align="end"
                className="ms-2"
              >
                <div className="px-3 py-2 text-muted small border-bottom mb-2">
                  Signed in as <strong>{user.role}</strong>
                </div>
                
                {/* Show manager-specific links if applicable */}
                {user.role === 'manager' && (
                  <NavDropdown.Item
                    className="fw-medium"
                    onClick={() => navigate(`/pantry/${user.id}/manage`)}
                  >
                    Manage Pantry
                  </NavDropdown.Item>
                )}
                
                <NavDropdown.Item onClick={handleLogout} className="text-danger fw-medium mt-1">
                  <BoxArrowRight className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button as="a" href="/login" className="btn btn-primary rounded-pill px-4 py-2 ms-2">
                Get Started
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
