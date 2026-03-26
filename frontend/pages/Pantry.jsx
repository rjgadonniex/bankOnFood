import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Button, Table, Form, InputGroup } from "react-bootstrap";
import { 
  GeoAltFill, 
  Clock, 
  ShareFill, 
  HeartFill, 
  Search, 
  InfoCircleFill, 
  CalendarEvent 
} from "react-bootstrap-icons";
import HomeNav from "../components/HomeNav"; // Using your existing team Navbar!

export default function Pantry() {
  // Grabs the ID from http://localhost:5173/pantry/test
  const { id } = useParams();

  return (
    <div className="bg-light bg-opacity-50 min-vh-100">
      <HomeNav />

      <Container className="py-5">
        {/* HEADER SECTION */}
        <Card className="border-0 shadow-sm rounded-4 mb-4 p-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-4">
            <div>
              <div className="text-primary fw-bold text-uppercase small mb-2 d-flex align-items-center gap-2">
                <GeoAltFill /> Downtown Community Center (ID: {id})
              </div>
              <h1 className="fw-bold mb-3 display-6">BankOnFood Main Branch</h1>
              <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small">
                <span className="d-flex align-items-center gap-1 fw-medium">
                  <Clock /> Open today: 9:00 AM - 5:00 PM
                </span>
                <Badge bg="success" className="bg-opacity-10 text-success px-2 py-1 border border-success border-opacity-25 rounded-pill">
                  ACCEPTING DONATIONS
                </Badge>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Button variant="light" className="border fw-bold d-flex align-items-center gap-2 shadow-sm px-4">
                <ShareFill size={14} /> Share
              </Button>
              <Button variant="primary" className="fw-bold d-flex align-items-center gap-2 shadow-sm px-4">
                <HeartFill size={14} /> Donate Now
              </Button>
            </div>
          </div>
        </Card>

        {/* TOP STATS ROW */}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-4 h-100 p-4">
              <div className="text-secondary small fw-bold text-uppercase mb-2 tracking-wide">Total Stock</div>
              <div className="display-5 fw-bold text-dark">
                1,284 <span className="fs-6 text-secondary fw-normal fst-italic">ITEMS</span>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-4 h-100 p-4">
              <div className="text-secondary small fw-bold text-uppercase mb-2 tracking-wide">Overall Status Level</div>
              <div className="display-5 fw-bold text-warning d-flex align-items-center gap-2">
                High <span className="fs-4">↗</span>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-4 h-100 p-4">
              <div className="text-secondary small fw-bold text-uppercase mb-2 tracking-wide">Active Volunteers</div>
              <div className="display-5 fw-bold text-primary">12</div>
            </Card>
          </Col>
        </Row>

        {/* MAIN CONTENT SPLIT */}
        <Row className="g-4">
          {/* LEFT COLUMN: INVENTORY TABLE */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden h-100">
              <Card.Header className="bg-white border-bottom p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <h5 className="fw-bold mb-0">📦 Inventory List</h5>
                <InputGroup className="w-auto shadow-sm" style={{ maxWidth: '250px' }}>
                  <InputGroup.Text className="bg-white border-end-0"><Search size={14} className="text-muted"/></InputGroup.Text>
                  <Form.Control placeholder="Search inventory..." className="border-start-0 shadow-none border-light-subtle" />
                </InputGroup>
              </Card.Header>
              <Card.Body className="p-0">
                <Table hover responsive className="mb-0 align-middle">
                  <thead className="bg-light text-secondary small text-uppercase">
                    <tr>
                      <th className="px-4 py-3 border-0 fw-semibold">Item Name</th>
                      <th className="px-4 py-3 border-0 fw-semibold">Category</th>
                      <th className="px-4 py-3 border-0 fw-semibold">Quantity</th>
                      <th className="px-4 py-3 border-0 fw-semibold">Status</th>
                      <th className="px-4 py-3 border-0 text-end fw-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-4 fw-bold text-dark">Canned Black Beans</td>
                      <td className="px-4 py-4 text-secondary small">Non-Perishables</td>
                      <td className="px-4 py-4 fw-medium">45 units</td>
                      <td className="px-4 py-4">
                        <Badge bg="warning" className="bg-opacity-25 text-warning px-2 py-1 rounded-1">RUNNING LOW</Badge>
                      </td>
                      <td className="px-4 py-4 text-end">
                        <Button variant="link" className="text-decoration-none text-primary fw-bold p-0 small">DETAILS</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 fw-bold text-dark">Whole Wheat Pasta</td>
                      <td className="px-4 py-4 text-secondary small">Dry Goods</td>
                      <td className="px-4 py-4 fw-medium">120 units</td>
                      <td className="px-4 py-4">
                        <Badge bg="success" className="bg-opacity-25 text-success px-2 py-1 rounded-1">IN STOCK</Badge>
                      </td>
                      <td className="px-4 py-4 text-end">
                        <Button variant="link" className="text-decoration-none text-primary fw-bold p-0 small">DETAILS</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 fw-bold text-dark">Peanut Butter (16oz)</td>
                      <td className="px-4 py-4 text-secondary small">Non-Perishables</td>
                      <td className="px-4 py-4 fw-medium">8 units</td>
                      <td className="px-4 py-4">
                        <Badge bg="danger" className="bg-opacity-25 text-danger px-2 py-1 rounded-1">CRITICAL</Badge>
                      </td>
                      <td className="px-4 py-4 text-end">
                        <Button variant="link" className="text-decoration-none text-primary fw-bold p-0 small">DETAILS</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer className="bg-white text-center py-3 border-top">
                <Button variant="link" className="text-secondary fw-bold text-decoration-none small">SHOW ALL 142 ITEMS</Button>
              </Card.Footer>
            </Card>
          </Col>

          {/* RIGHT COLUMN: SHIFTS & WISHLIST */}
          <Col lg={4} className="d-flex flex-column gap-4">
            {/* Shifts Card */}
            <Card className="border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">👥 Available Shifts</h5>
              <div className="d-flex flex-column gap-3">
                <div className="border border-light-subtle rounded-3 p-3 bg-light bg-opacity-50">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="fw-bold text-dark">Morning Stocking</div>
                      <div className="text-secondary small d-flex align-items-center gap-1 mt-1">
                        <CalendarEvent size={12}/> Tomorrow, 08:00
                      </div>
                    </div>
                    <Badge bg="primary" className="bg-opacity-10 text-primary">2 SPOTS</Badge>
                  </div>
                  <Button variant="primary" size="sm" className="w-100 fw-bold mt-2 shadow-sm">Pick Up Shift</Button>
                </div>
                <div className="border border-light-subtle rounded-3 p-3 bg-light bg-opacity-50">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="fw-bold text-dark">Distribution Asst.</div>
                      <div className="text-secondary small d-flex align-items-center gap-1 mt-1">
                        <CalendarEvent size={12}/> Wed, 13:00
                      </div>
                    </div>
                    <Badge bg="primary" className="bg-opacity-10 text-primary">5 SPOTS</Badge>
                  </div>
                  <Button variant="primary" size="sm" className="w-100 fw-bold mt-2 shadow-sm">Pick Up Shift</Button>
                </div>
              </div>
            </Card>

            {/* Wishlist Card */}
            <Card className="border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-2 d-flex align-items-center gap-2">🛍️ Donor Wishlist</h5>
              <div className="text-secondary small fw-bold text-uppercase mb-4" style={{fontSize: '10px'}}>Updated 2 hours ago</div>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                <li className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3 text-dark fw-medium">
                    <div className="bg-success rounded-circle" style={{width: '6px', height: '6px'}}></div> Canned Protein
                  </div>
                  <InfoCircleFill className="text-light-subtle" size={16}/>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3 text-dark fw-medium">
                    <div className="bg-success rounded-circle" style={{width: '6px', height: '6px'}}></div> Low-Sodium Veggies
                  </div>
                  <InfoCircleFill className="text-light-subtle" size={16}/>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3 text-dark fw-medium">
                    <div className="bg-success rounded-circle" style={{width: '6px', height: '6px'}}></div> Hygiene Items
                  </div>
                  <InfoCircleFill className="text-light-subtle" size={16}/>
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}