import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, ProgressBar } from "react-bootstrap";
import {
  PersonPlus,
  Envelope,
  Lock,
  ArrowLeft,
  Person,
  Shop,
  GeoAlt,
  Telephone,
  Globe,
  ArrowRight,
  Clock,
} from "react-bootstrap-icons";

export default function ManagerRegister() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            {" "}
            <div className="mb-4 d-flex justify-content-between align-items-center">
              <Button
                variant="link"
                onClick={step === 1 ? () => (window.location.href = "/") : prevStep}
                className="text-decoration-none text-secondary p-0 d-flex align-items-center gap-2"
              >
                <ArrowLeft size={18} />
                <span>{step === 1 ? "Back to Home" : "Back to Personal Details"}</span>
              </Button>
              <span className="text-muted small fw-bold">Step {step} of 2</span>
            </div>
            <Card className="border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
              <ProgressBar
                variant="success"
                now={step === 1 ? 50 : 100}
                className="mb-4"
                style={{ height: "8px" }}
              />

              <div className="text-center mb-4">
                <h2 className="fw-bold text-dark">
                  {step === 1 ? "Manager Account" : "Pantry Details"}
                </h2>
                <p className="text-muted small">
                  {step === 1
                    ? "Set up your personal login credentials"
                    : "Tell us about the facility you manage"}
                </p>
              </div>

              <Form onSubmit={(e) => e.preventDefault()}>
                {step === 1 ? (
                  <>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label className="small fw-bold text-secondary text-uppercase">
                        Full Name
                      </Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <Person className="text-muted" />
                        </span>
                        <Form.Control
                          type="text"
                          placeholder="John Doe"
                          className="bg-light border-start-0 ps-0 rounded-end-3"
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label className="small fw-bold text-secondary text-uppercase">
                        Email Address
                      </Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <Envelope className="text-muted" />
                        </span>
                        <Form.Control
                          type="email"
                          placeholder="name@example.com"
                          className="bg-light border-start-0 ps-0 rounded-end-3"
                        />
                      </div>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formPassword">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">
                            Password
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <Lock className="text-muted" />
                            </span>
                            <Form.Control
                              type="password"
                              placeholder="Create password"
                              className="bg-light border-start-0 ps-0 rounded-end-3"
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">
                            Confirm Password
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <Lock className="text-muted" />
                            </span>
                            <Form.Control
                              type="password"
                              placeholder="Repeat password"
                              className="bg-light border-start-0 ps-0 rounded-end-3"
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      variant="success"
                      onClick={nextStep}
                      className="w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mt-4"
                    >
                      Next: Pantry Details <ArrowRight size={20} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3" controlId="pantryName">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">
                            Pantry Name
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <Shop className="text-muted" />
                            </span>
                            <Form.Control
                              type="text"
                              placeholder="Community Food Bank"
                              className="bg-light border-start-0 ps-0 rounded-end-3"
                            />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group className="mb-3" controlId="pantryLocation">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">
                            Address / Location
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <GeoAlt className="text-muted" />
                            </span>
                            <Form.Control
                              type="text"
                              placeholder="123 Street, City, ST 12345"
                              className="bg-light border-start-0 ps-0 rounded-end-3"
                            />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="pantryEmail">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">
                            Public Contact Email
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <Envelope className="text-muted" />
                            </span>
                            <Form.Control
                              type="email"
                              placeholder="info@pantry.org"
                              className="bg-light border-start-0 ps-0 rounded-end-3"
                            />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="pantryHours">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">
                            Operating Hours
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <Clock className="text-muted" />
                            </span>
                            <Form.Control
                              type="text"
                              placeholder="e.g. 9AM - 5PM"
                              className="bg-light border-start-0 ps-0 rounded-end-3"
                            />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="pantryPhone">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">
                            Phone
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <Telephone className="text-muted" />
                            </span>
                            <Form.Control
                              type="tel"
                              placeholder="(123) 456-7890"
                              className="bg-light border-start-0 ps-0 rounded-end-3"
                            />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="pantryWebsite">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">
                            Website
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <Globe className="text-muted" />
                            </span>
                            <Form.Control
                              type="url"
                              placeholder="https://www.example.com/"
                              className="bg-light border-start-0 ps-0 rounded-end-3"
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mt-4"
                    >
                      <PersonPlus size={20} /> Complete Registration
                    </Button>
                  </>
                )}

                <div className="text-center mt-4">
                  <p className="text-muted small mb-0">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary fw-bold text-decoration-none">
                      Sign In
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
