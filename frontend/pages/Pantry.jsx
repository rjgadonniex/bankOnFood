import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Table,
  Button,
  InputGroup,
  Form,
  Modal,
} from "react-bootstrap";
import { GeoAltFill, Clock, Search, ChevronLeft, BoxSeam } from "react-bootstrap-icons";
import NavigationBar from "../components/NavigationBar";

const STATUS_VARIANT = {
  "RUNNING LOW": "warning",
  "IN STOCK": "success",
  CRITICAL: "danger",
};

const INITIAL_DATA = {
  1: {
    name: "Example Pantry Name",
    location: "Example Pantry Address",
    hours: "9:00 AM - 5:00 PM",
    inventory: [
      {
        id: 1,
        name: "Canned Black Beans",
        category: "Non-Perishables",
        quantity: "45",
        status: "RUNNING LOW",
        wishlist: true,
      },
      {
        id: 2,
        name: "Whole Wheat Pasta",
        category: "Dry Goods",
        quantity: "120",
        status: "IN STOCK",
        wishlist: false,
      },
      {
        id: 3,
        name: "Peanut Butter (16oz)",
        category: "Non-Perishables",
        quantity: "8",
        status: "CRITICAL",
        wishlist: true,
      },
    ],
  },
};

export default function PantryDetail() {
  const { id } = useParams();
  const [pantry, setPantry] = useState(INITIAL_DATA[id] ?? INITIAL_DATA[1]);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pledgeQuantity, setPledgeQuantity] = useState("");
  const [pledgeUnit, setPledgeUnit] = useState("");
  const [donationForm, setDonationForm] = useState({
    name: "",
    category: "Non-Perishables",
    quantity: "",
    unit: "",
  });

  const handleGeneralDonation = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      ...donationForm,
      status: "IN STOCK",
      wishlist: false,
    };
    setPantry({ ...pantry, inventory: [newItem, ...pantry.inventory] });
    setShowDonationModal(false);
    setDonationForm({ name: "", category: "Non-Perishables", quantity: "" });
  };

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    alert(`Pledged ${pledgeQuantity} units of ${selectedItem.name}.`);
    setShowPledgeModal(false);
    setPledgeQuantity("");
  };

  return (
    <div className="bg-white min-vh-100">
      <NavigationBar />
      <Container style={{ paddingTop: "100px" }} className="pb-5">
        <Link
          to="/search"
          className="text-decoration-none text-muted small d-flex align-items-center mb-4"
        >
          <ChevronLeft className="me-1" /> Back to Search
        </Link>

        <header className="mb-5 d-flex justify-content-between align-items-end flex-wrap gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 text-primary fw-bold small mb-2">
              <GeoAltFill size={14} /> {pantry.location}
            </div>
            <h1 className="fw-bold text-dark mb-3">{pantry.name}</h1>
            <div className="text-secondary small d-flex align-items-center gap-2">
              <Clock size={16} /> {pantry.hours}
            </div>
          </div>
          <Button
            variant="primary"
            className="rounded-pill px-4 fw-bold shadow-sm"
            onClick={() => setShowDonationModal(true)}
          >
            General Donation
          </Button>
        </header>

        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Card.Header className="bg-white p-4 border-bottom">
            <Row className="align-items-center">
              <Col>
                <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
                  <BoxSeam className="text-primary" /> Inventory
                </h4>
              </Col>
              <Col md={4}>
                <InputGroup className="bg-light rounded-3">
                  <InputGroup.Text className="bg-transparent border-0">
                    <Search size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search..."
                    className="bg-transparent border-0 shadow-none ps-0"
                  />
                </InputGroup>
              </Col>
            </Row>
          </Card.Header>

          <Table hover responsive className="mb-0 align-middle">
            <thead className="bg-light">
              <tr className="text-muted small fw-bold">
                <th className="ps-4 py-3">ITEM NAME</th>
                <th className="py-3">CATEGORY</th>
                <th className="py-3">QUANTITY</th>
                <th className="py-3">STATUS</th>
                <th className="pe-4 py-3 text-end">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {pantry.inventory.map((item) => (
                <tr key={item.id}>
                  <td className="ps-4 fw-bold">{item.name}</td>
                  <td className="text-secondary">{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Badge
                      bg={STATUS_VARIANT[item.status] || "secondary"}
                      className="bg-opacity-10 text-dark border px-3 py-2 rounded-2 small"
                      style={{ color: `var(--bs-${STATUS_VARIANT[item.status]})` }}
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="pe-4 text-end">
                    {item.wishlist && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="rounded-pill px-3 fw-bold"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowPledgeModal(true);
                        }}
                      >
                        PLEDGE
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Modal show={showDonationModal} onHide={() => setShowDonationModal(false)} centered>
          <Form onSubmit={handleGeneralDonation}>
            <Modal.Header closeButton className="border-0">
              <Modal.Title className="fw-bold">General Donation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">ITEM NAME</Form.Label>
                <Form.Control
                  required
                  value={donationForm.name}
                  onChange={(e) => setDonationForm({ ...donationForm, name: e.target.value })}
                  placeholder="e.g. Canned Corn"
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Label className="small fw-bold">CATEGORY</Form.Label>
                  <Form.Select
                    value={donationForm.category}
                    onChange={(e) => setDonationForm({ ...donationForm, category: e.target.value })}
                  >
                    <option value="" disabled>
                      Select category
                    </option>{" "}
                    {/* Added helper option */}
                    <option>Non-Perishables</option>
                    <option>Dry Goods</option>
                    <option>Produce</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label className="small fw-bold">QUANTITY</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={donationForm.quantity}
                    onChange={(e) => setDonationForm({ ...donationForm, quantity: e.target.value })}
                    placeholder="0" // Added placeholder
                  />
                </Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">UNIT</Form.Label>
                    <Form.Select
                      value={donationForm.unit}
                      onChange={(e) => setDonationForm({ ...donationForm, unit: e.target.value })}
                      required
                    >
                      <option value="">Select unit</option>
                      <option value="lbs">lbs (pounds)</option>
                      <option value="cans">cans</option>
                      <option value="boxes">boxes</option>
                      <option value="bags">bags</option>
                      <option value="units">units</option>
                    </Form.Select>
                  </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button
                variant="light"
                className="rounded-pill"
                onClick={() => setShowDonationModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="rounded-pill px-4">
                Donate Item
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={showPledgeModal} onHide={() => setShowPledgeModal(false)} centered>
          <Form onSubmit={handlePledgeSubmit}>
            <Modal.Header closeButton className="border-0">
              <Modal.Title className="fw-bold">Pledge Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">ITEM</Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={selectedItem?.name}
                  className="fw-bold text-primary ps-2 bg-light rounded-3"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted">QUANTITY</Form.Label>
                <Form.Control
                  required
                  type="number"
                  autoFocus
                  value={pledgeQuantity}
                  onChange={(e) => setPledgeQuantity(e.target.value)}
                  placeholder="0"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">UNIT</Form.Label>
                <Form.Select
                  value={pledgeUnit}
                  onChange={(e) => setPledgeUnit(e.target.value)}
                  required
                >
                  <option value="">Select unit</option>
                  <option value="lbs">lbs (pounds)</option>
                  <option value="cans">cans</option>
                  <option value="boxes">boxes</option>
                  <option value="bags">bags</option>
                  <option value="units">units</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button
                variant="light"
                className="rounded-pill"
                onClick={() => setShowPledgeModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="rounded-pill px-4">
                Confirm Pledge
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
}
