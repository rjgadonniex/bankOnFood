import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, ProgressBar, Alert } from "react-bootstrap";
import { PersonPlus, Envelope, Lock, ArrowLeft, Person, Shop, GeoAlt, Telephone, Globe, ArrowRight, Clock } from "react-bootstrap-icons";
import axios from "axios";

export default function ManagerRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // state for both steps
  const [formData, setFormData] = useState({
    // User Details
    name: "", email: "", password: "", confirmPassword: "",
    // Pantry Details
    pantryName: "", pantryLocation: "", pantryEmail: "", 
    pantryHours: "", pantryPhone: "", pantryWebsite: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }
    setError("");
    setStep(2);
  };
  const prevStep = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // register the User as a 'manager'
      const authResponse = await axios.post("http://localhost:5001/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "manager"
      });

      const managerId = authResponse.data.user.id;

      // prepare the Pantry Data
      const pantryPayload = {
        name: formData.pantryName,
        address: formData.pantryLocation,
        email: formData.pantryEmail,
        hours: formData.pantryHours,
        phone: formData.pantryPhone,
        website: formData.pantryWebsite,
        manager: managerId 
      };

      await axios.post("http://localhost:5001/api/Pantries", pantryPayload);
      
      console.log("Pantry Payload ready for backend:", pantryPayload);

      setSuccess("Manager account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2500);

    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <div className="mb-4 d-flex justify-content-between align-items-center">
              <Button
                variant="link"
                onClick={step === 1 ? () => navigate("/") : prevStep}
                className="text-decoration-none text-secondary p-0 d-flex align-items-center gap-2"
              >
                <ArrowLeft size={18} />
                <span>{step === 1 ? "Back to Home" : "Back to Personal Details"}</span>
              </Button>
              <span className="text-muted small fw-bold">Step {step} of 2</span>
            </div>
            
            <Card className="border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
              <ProgressBar variant="success" now={step === 1 ? 50 : 100} className="mb-4" style={{ height: "8px" }} />

              <div className="text-center mb-4">
                <h2 className="fw-bold text-dark">{step === 1 ? "Manager Account" : "Pantry Details"}</h2>
                <p className="text-muted small">
                  {step === 1 ? "Set up your personal login credentials" : "Tell us about the facility you manage"}
                </p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={step === 1 ? (e) => { e.preventDefault(); nextStep(); } : handleSubmit}>
                {step === 1 ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold text-secondary text-uppercase">Full Name</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><Person className="text-muted" /></span>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="bg-light border-start-0 ps-0 rounded-end-3" />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold text-secondary text-uppercase">Email Address</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><Envelope className="text-muted" /></span>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com" className="bg-light border-start-0 ps-0 rounded-end-3" />
                      </div>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">Password</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><Lock className="text-muted" /></span>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create password" className="bg-light border-start-0 ps-0 rounded-end-3" />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">Confirm Password</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><Lock className="text-muted" /></span>
                            <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Repeat password" className="bg-light border-start-0 ps-0 rounded-end-3" />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button variant="success" type="submit" className="w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mt-4">
                      Next: Pantry Details <ArrowRight size={20} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">Pantry Name</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><Shop className="text-muted" /></span>
                            <Form.Control type="text" name="pantryName" value={formData.pantryName} onChange={handleChange} required placeholder="Community Food Bank" className="bg-light border-start-0 ps-0 rounded-end-3" />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">Address / Location</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><GeoAlt className="text-muted" /></span>
                            <Form.Control type="text" name="pantryLocation" value={formData.pantryLocation} onChange={handleChange} required placeholder="123 Street, City, ST 12345" className="bg-light border-start-0 ps-0 rounded-end-3" />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">Public Contact Email</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><Envelope className="text-muted" /></span>
                            <Form.Control type="email" name="pantryEmail" value={formData.pantryEmail} onChange={handleChange} placeholder="info@pantry.org" className="bg-light border-start-0 ps-0 rounded-end-3" />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">Operating Hours</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><Clock className="text-muted" /></span>
                            <Form.Control type="text" name="pantryHours" value={formData.pantryHours} onChange={handleChange} placeholder="e.g. 9AM - 5PM" className="bg-light border-start-0 ps-0 rounded-end-3" />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">Phone</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><Telephone className="text-muted" /></span>
                            <Form.Control type="tel" name="pantryPhone" value={formData.pantryPhone} onChange={handleChange} placeholder="(123) 456-7890" className="bg-light border-start-0 ps-0 rounded-end-3" />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-bold text-secondary text-uppercase">Website</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><Globe className="text-muted" /></span>
                            <Form.Control type="url" name="pantryWebsite" value={formData.pantryWebsite} onChange={handleChange} placeholder="https://www.example.com/" className="bg-light border-start-0 ps-0 rounded-end-3" />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button variant="success" type="submit" disabled={loading} className="w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mt-4">
                      <PersonPlus size={20} /> {loading ? "Registering..." : "Complete Registration"}
                    </Button>
                  </>
                )}
                
                <div className="text-center mt-4">
                  <p className="text-muted small mb-0">Already have an account? <a href="/login" className="text-primary fw-bold text-decoration-none">Sign In</a></p>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}