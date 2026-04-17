import React, { useState , useMemo} from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { matchSorter } from 'match-sorter';
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
import {
  GeoAltFill,
  Clock,
  Search,
  ChevronLeft,
  BoxSeam,
  Spinner,
  Globe,
  Telephone,
  Envelope,
} from "react-bootstrap-icons";
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
        unit: "cans",
        status: "RUNNING LOW",
        wishlist: true,
      },
      {
        id: 2,
        name: "Whole Wheat Pasta",
        category: "Dry Goods",
        quantity: "120",
        unit: "lbs",
        status: "IN STOCK",
        wishlist: false,
      },
      {
        id: 3,
        name: "Peanut Butter (16oz)",
        category: "Non-Perishables",
        quantity: "8",
        unit: "units",
        status: "CRITICAL",
        wishlist: true,
      },
    ],
  },
};

export default function PantryDetail() {
  const { id } = useParams();
  //const [pantry, setPantry] = useState(INITIAL_DATA[id] ?? INITIAL_DATA[1]);
  const [pantry, setPantry] = useState(null);
  const [inventory, setInventory] = useState([]);


  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pledgeQuantity, setPledgeQuantity] = useState("");
  const [pledgeUnit, setPledgeUnit] = useState("");
  const [query, setQuery] = useState("");
  const [donationForm, setDonationForm] = useState({
    name: "",
    category: "Non-Perishables",
    quantity: "",
    unit: "",
  });

  // fetch pantry info
  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/Pantries/public/${id}`);
        setPantry(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPantry();
  }, [id]);

  // fetch items for the pantry
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/Items/${id}`);
        setInventory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, [id]);

 

    const filteredInventory = useMemo(() => {
    return matchSorter(inventory, query, { keys: ['name', 'category'] });
  }, [inventory, query]);
  

  if (!pantry) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  

  const handleGeneralDonation = async (e) => {
    e.preventDefault();

    try {
      const quantity = parseInt(donationForm.quantity, 10);
      if (!donationForm.name || !donationForm.unit || !donationForm.category || !quantity) {
        alert("Please complete the donation form before submitting.");
        return;
      }

      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const donatorId = user?.id;

      const existingItem = inventory.find(
        (item) =>
          item.name.toLowerCase().trim() === donationForm.name.toLowerCase().trim() &&
          item.unit === donationForm.unit,
      );

      const itemId = existingItem
        ? existingItem._id
        : (
            await axios.post(`${import.meta.env.VITE_API_URL}/api/Item`, {
              name: donationForm.name.trim(),
              category: donationForm.category,
              quantity: 0,
              unit: donationForm.unit,
              status: "CRITICAL",
              wishlist: false,
              pantryID: pantry._id,
              placeholder: true,
            })
          ).data._id;

      await axios.post(`${import.meta.env.VITE_API_URL}/api/DonationPledges`, {
        donator: donatorId,
        item: itemId,
        quantity,
        unit: donationForm.unit,
        pantryID: pantry._id,
      });

      setShowDonationModal(false);
      setDonationForm({ name: "", category: "Non-Perishables", quantity: "", unit: "" });
      alert(
        `Successfully created a donation pledge for ${quantity} ${donationForm.unit} of ${donationForm.name}!`,
      );
    } catch (err) {
      console.error(err);
      alert("Failed to submit donation. Please try again.");
    }
  };

  const handlePledgeSubmit = async (e) => {
    e.preventDefault();

    // check if user is logged in first
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("You must be logged in to make a pledge");
      return;
    }
    const user = JSON.parse(storedUser);

    try {
      // send pledge to the database
      await axios.post(`${import.meta.env.VITE_API_URL}/api/DonationPledges`, {
        donator: user.id,
        item: selectedItem._id,
        quantity: parseInt(pledgeQuantity),
        unit: pledgeUnit,
        pantryID: pantry._id,
      });

      alert(`Successfully pledged ${pledgeQuantity} ${pledgeUnit} of ${selectedItem.name}!`);

      setShowPledgeModal(false);
      setPledgeQuantity("");
      setPledgeUnit("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit pledge. Please try again.");
    }
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
              {pantry.address && <GeoAltFill size={14} />} {pantry.address}
            </div>
            <h1 className="fw-bold text-dark mb-3">{pantry.name}</h1>
            <Row className="mt-2">
              {pantry.hours && (
                <Col xs="auto" className="text-secondary small d-flex align-items-center gap-2">
                  <Clock size={16} /> {pantry.hours}
                </Col>
              )}
              {pantry.website && (
                <Col xs="auto" className="text-secondary small d-flex align-items-center gap-2">
                  <Globe size={16} />{" "}
                  <a
                    href={pantry.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    {pantry.website}
                  </a>
                </Col>
              )}
              {pantry.phone && (
                <Col xs="auto" className="text-secondary small d-flex align-items-center gap-2">
                  <Telephone size={16} />{" "}
                  <a href={`tel:${pantry.phone}`} className="text-decoration-none">
                    {pantry.phone}
                  </a>
                </Col>
              )}
              {pantry.email && (
                <Col xs="auto" className="text-secondary small d-flex align-items-center gap-2">
                  <Envelope size={16} />{" "}
                  <a href={`mailto:${pantry.email}`} className="text-decoration-none">
                    {pantry.email}
                  </a>
                </Col>
              )}
            </Row>
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
                    placeholder="Search by item or category"
                    className="bg-transparent border-0 shadow-none ps-0"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
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
                <th className="py-3">UNIT</th>
                <th className="py-3">STATUS</th>
                <th className="pe-4 py-3 text-end">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item._id}>
                  <td className="ps-4 fw-bold">{item.name}</td>
                  <td className="text-secondary">{item.category}</td>
                  <td>{item.quantity}</td>
                  <td className="text-secondary">{item.unit}</td>
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
                    <option>Meat & Seafood</option>
                    <option>Dairy & Refrigerated</option>
                    <option>Bakery</option>
                    <option>Frozen Foods</option>
                    <option>Beverages</option>
                    <option>Non-Perishables</option>
                    <option>Dry Goods</option>
                    <option>Produce</option>
                    <option>Miscellaneous</option>
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
                <Col>
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
                </Col>
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
