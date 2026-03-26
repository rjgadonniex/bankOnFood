import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { PersonPlus, Envelope, Lock, ArrowLeft, Person } from "react-bootstrap-icons";

export default function Register() {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="mb-4">
              <Button
                variant="link"
                href="/"
                className="text-decoration-none text-secondary p-0 d-flex align-items-center gap-2"
              >
                <ArrowLeft size={18} />
                <span>Back to Home</span>
              </Button>
            </div>

            <Card className="border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-dark">Create Account</h2>
              </div>

              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="small fw-bold text-secondary">Full Name</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Person className="text-muted" />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      className="bg-light border-start-0 ps-0"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="small fw-bold text-secondary">Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Envelope className="text-muted" />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      className="bg-light border-start-0 ps-0"
                    />
                  </div>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label className="small fw-bold text-secondary">Password</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <Lock className="text-muted" />
                        </span>
                        <Form.Control
                          type="password"
                          placeholder="Enter your password"
                          className="bg-light border-start-0 ps-0"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                      <Form.Label className="small fw-bold text-secondary">
                        Confirm Password
                      </Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <Lock className="text-muted" />
                        </span>
                        <Form.Control
                          type="password"
                          placeholder="Confirm your password"
                          className="bg-light border-start-0 ps-0"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="success"
                  type="submit"
                  className="w-100 py-2 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4"
                >
                  <PersonPlus size={20} />
                  Create Account
                </Button>

                <div className="text-center">
                  <p className="text-muted small mb-0">
                    Already have an account?
                    <br />
                    <a href="/login" className="text-primary fw-bold text-decoration-none">
                      Sign In Here
                    </a>
                  </p>
                </div>
              </Form>
            </Card>

            <div className="text-center mt-4">
              <p className="text-muted small">
                Are you a pantry administrator?
                <br />
                <a href="/register/manager" className="text-success fw-bold text-decoration-none">
                  Register as Manager
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
