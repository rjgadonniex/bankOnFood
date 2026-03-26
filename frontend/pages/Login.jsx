import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { BoxArrowInRight, Envelope, Lock, ArrowLeft } from "react-bootstrap-icons";

export default function Login() {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          {/* Updated lg={5} to lg={6} for consistency */}
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
                <h2 className="fw-bold text-dark">Login</h2>
              </div>

              <Form>
                {/* Email Address */}
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

                {/* Password */}
                <Form.Group className="mb-4" controlId="formPassword">
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

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4"
                >
                  <BoxArrowInRight size={20} />
                  Sign In
                </Button>

                <div className="text-center">
                  <p className="text-muted small mb-0">
                    Don't have an account yet?
                    <br />
                    <a href="/register" className="text-success fw-bold text-decoration-none">
                      Create an Account
                    </a>
                  </p>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
