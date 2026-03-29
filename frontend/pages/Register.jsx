import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { PersonPlus, Envelope, Lock, ArrowLeft, Person } from "react-bootstrap-icons";
import axios from "axios";

export default function Register() {
  // hold form data and UI messages
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setError("");
    setSuccess("");

    // basic validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      // send data to your Node backend
      const response = await axios.post("http://localhost:5001/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user" // Hardcoded to 'user' since managers have their own page
      });

      setSuccess(response.data.message);
      // clear form after success
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      // grab the error message sent from the backend (like "Email already exists")
      setError(err.response?.data?.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

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

              {/* Display Error or Success Messages */}
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="small fw-bold text-secondary">Full Name</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Person className="text-muted" />
                    </span>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
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
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          placeholder="Create password"
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
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          placeholder="Confirm password"
                          className="bg-light border-start-0 ps-0"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="success"
                  type="submit"
                  disabled={loading}
                  className="w-100 py-2 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4 mt-2"
                >
                  <PersonPlus size={20} />
                  {loading ? "Creating Account..." : "Create Account"}
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