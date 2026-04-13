import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Table, Button, Form, Nav, Modal } from "react-bootstrap";
import {
  PencilSquare,
  PlusLg,
  Trash,
  ChevronLeft,
  BoxSeam,
  People,
  CheckCircle,
} from "react-bootstrap-icons";

import NavigationBar from "../components/NavigationBar";

/*
const INITIAL_PANTRY_DATA = {
  1: {
    pantryID: 1,
    name: "Pantry Name",
    address: "Pantry Address",
    latitude: 0,
    longitude: 0,
    hours: "9:00 AM - 5:00 PM",
    phone: "123-456-7890",
    email: "example@email.com",
    website: "www.example.com",
    inventory: parseInv,
    pledges: [
      {
        id: 101,
        donor: "Sarah Jenkins",
        item: "Canned Black Beans",
        quantity: 20,
        date: "2026-03-28",
      },
      { id: 102, donor: "Mike Ross", item: "Peanut Butter", quantity: 5, date: "2026-03-27" },
    ],
  },
};
*/

const STATUS_VARIANT = {
  "IN STOCK": "success",
  "RUNNING LOW": "warning",
  CRITICAL: "danger",
};

export default function Manage() {
  const { id } = useParams();
  //const [pantry, setPantry] = useState(INITIAL_PANTRY_DATA[id] || INITIAL_PANTRY_DATA[1]);
  const [pantry, setPantry] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [pledges, setPledges] = useState([]);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [activePledge, setActivePledge] = useState(null);
  const [receiveQuantity, setReceiveQuantity] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState("");

  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Non-Perishables",
    quantity: 0,
    unit: "units",
    status: "IN STOCK",
    wishlist: false,
  });

  // pantry info
  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/Pantries/${id}`);
        console.log("Backend response:", res.data);
        setPantry(res.data);
      } catch (err) {
        console.error("Pantry not found. Your account may be corrupted or disconnected.");
      }
    };

    fetchPantry();
  }, [id]);

  // item info per pantry
  useEffect(() => {
    const fetchItems = async () => {
      if (!pantry?._id) {
        return;
      }
      try {
        console.log(pantry._id);
        const res = await axios.get(`http://localhost:5001/api/Items/${pantry._id}`);
        console.log("Backend response:", res.data);
        setInventory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, [pantry]);

  // fetch pledges per pantry
  useEffect(() => {
    const fetchPledges = async () => {
      if (!pantry?._id) return;
      try {
        const res = await axios.get(`http://localhost:5001/api/DonationPledges/${pantry._id}`);
        setPledges(res.data);
      } catch (err) {
        console.error("Error fetching pledges:", err);
      }
    };
    fetchPledges();
  }, [pantry]);

  if (error) {
    return <div className="text-center mt-5 pt-5 text-danger fw-bold display-6">{error}</div>;
  }

  if (!pantry) {
    return <div>Loading...</div>;
  }

  const handlePantryChange = (e) => {
    const { name, value } = e.target;
    setPantry((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      category: "Non-Perishables",
      quantity: 0,
      unit: "units",
      status: "IN STOCK",
      wishlist: false,
    });
    setShowItemModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowItemModal(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setInventory((prev) => prev.filter((item) => item._id !== itemId));
      try {
        console.log(itemId);
        const response = await axios.delete(`http://localhost:5001/api/Items/${itemId}`);
        console.log("Item deleted");
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        console.log(editingItem._id);
        const res = await axios.put(`http://localhost:5001/api/Items/${editingItem._id}`, {
          ...formData,
        });
        setInventory((prev) =>
          prev.map((item) => (item._id === editingItem._id ? { ...item, ...res.data } : item)),
        );
      } else {
        const res = await axios.post("http://localhost:5001/api/Items/", {
          ...formData,
          pantryID: pantry._id,
        });
        setInventory((prev) => [...prev, res.data]);
      }

      setShowItemModal(false);
    } catch (error) {
      console.error("Error saving item: ", error);
    }
  };

  const handleDeletePledge = async (pledgeId) => {
    if (window.confirm("Mark this pledge as complete/removed?")) {
      try {
        await axios.delete(`http://localhost:5001/api/DonationPledges/${pledgeId}`);
        setPledges((prev) => prev.filter((p) => p._id !== pledgeId));
      } catch (error) {
        console.error("Error deleting pledge:", error);
      }
    }
  };

  // open and pre-fill with what the donor promised
  const handleOpenReceive = (pledge) => {
    setActivePledge(pledge);
    setReceiveQuantity(pledge.quantity);
    setShowReceiveModal(true);
  };

  // submits actual received amount to the database
  const handleConfirmReceive = async (e) => {
    e.preventDefault();
    try {
      // find the original item in our inventory to get its current quantity
      const itemToUpdate = inventory.find((i) => i._id === activePledge.item._id);

      if (!itemToUpdate) {
        alert("Error: This item was deleted from the inventory.");
        return;
      }

      // calculate the new total inventory
      const newTotal = itemToUpdate.quantity + parseInt(receiveQuantity);

      // update the item in the database
      await axios.put(`http://localhost:5001/api/Items/${itemToUpdate._id}`, {
        ...itemToUpdate,
        quantity: newTotal,
      });

      // delete the completed pledge from the database
      await axios.delete(`http://localhost:5001/api/DonationPledges/${activePledge._id}`);

      setInventory((prev) =>
        prev.map((i) => (i._id === itemToUpdate._id ? { ...i, quantity: newTotal } : i)),
      );
      setPledges((prev) => prev.filter((p) => p._id !== activePledge._id));

      setShowReceiveModal(false);
      alert(`Successfully added ${receiveQuantity} ${activePledge.unit} to your inventory!`);
    } catch (err) {
      console.error("Error receiving pledge:", err);
      alert("Failed to process the received pledge.");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <NavigationBar />
      <Container style={{ paddingTop: "100px" }} className="pb-5">
        <Link
          to={`/pantry/${pantry?._id}`}
          className="text-decoration-none text-muted small d-flex align-items-center mb-4"
        >
          <ChevronLeft className="me-1" /> View Public Page
        </Link>

        <header className="mb-4">
          <h1 className="fw-bold text-dark">Pantry Management</h1>
        </header>

        {/* Tab Nav */}
        <Nav
          variant="pills"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="gap-2 mb-4 border-0"
        >
          <Nav.Item>
            <Nav.Link
              eventKey="profile"
              className={`px-4 py-2 fw-bold rounded-3 border ${activeTab === "profile" ? "bg-white text-dark shadow-sm border-white" : "bg-transparent text-primary border-transparent"}`}
            >
              Pantry Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="inventory"
              className={`px-4 py-2 fw-bold rounded-3 border ${activeTab === "inventory" ? "bg-white text-dark shadow-sm border-white" : "bg-transparent text-primary border-transparent"}`}
            >
              Inventory List
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="pledges"
              className={`px-4 py-2 fw-bold rounded-3 border ${activeTab === "pledges" ? "bg-white text-dark shadow-sm border-white" : "bg-transparent text-primary border-transparent"}`}
            >
              Donation Pledges
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Header className="bg-white border-0 p-4 d-flex justify-content-between align-items-center border-bottom">
              <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <PencilSquare className="text-primary" /> Pantry Profile
              </h4>
              {/* Save Button moved to Header to match Inventory layout */}
              <Button
                variant="primary"
                type="submit"
                form="pantry-profile-form"
                className="rounded-pill px-4 fw-bold shadow-sm"
              >
                Save Changes
              </Button>
            </Card.Header>

            <Card.Body className="p-4">
              <Form
                id="pantry-profile-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const { _id, manager, pledges, __v, ...updateData } = pantry;
                    const res = await axios.put(
                      `http://localhost:5001/api/Pantries/${id}`,
                      updateData,
                    );
                    console.log("Updated: ", res.data);
                    alert("Profile updated!");
                  } catch (err) {
                    console.error("Update failed: ", err);
                    alert("Failed to update profile info.");
                  }
                }}
              >
                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-3">General Information</h6>
                  <Row className="g-3">
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="fw-bold small text-muted text-uppercase">
                          Pantry Name
                        </Form.Label>
                        <Form.Control
                          name="name"
                          value={pantry.name}
                          onChange={handlePantryChange}
                          className="rounded-3 bg-light border-0"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold small text-muted text-uppercase">
                          Address
                        </Form.Label>
                        <Form.Control
                          name="address"
                          value={pantry.address}
                          onChange={handlePantryChange}
                          className="rounded-3 bg-light border-0"
                          placeholder="123 Example St, City, State Zip Code"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold small text-muted text-uppercase">
                          Latitude
                        </Form.Label>
                        <Form.Control
                          type="number"
                          step="any"
                          name="latitude"
                          value={pantry.latitude ?? ""}
                          onChange={handlePantryChange}
                          className="rounded-3 bg-light border-0"
                          placeholder="0.0000"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-bold small text-muted text-uppercase">
                          Longitude
                        </Form.Label>
                        <Form.Control
                          type="number"
                          step="any"
                          name="longitude"
                          value={pantry.longitude ?? ""}
                          onChange={handlePantryChange}
                          className="rounded-3 bg-light border-0"
                          placeholder="0.0000"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-3">Contact & Online Presence</h6>
                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="fw-bold small text-muted text-uppercase">
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          name="phone"
                          value={pantry.phone}
                          onChange={handlePantryChange}
                          className="rounded-3 bg-light border-0"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="fw-bold small text-muted text-uppercase">
                          Email Address
                        </Form.Label>
                        <Form.Control
                          name="email"
                          value={pantry.email}
                          onChange={handlePantryChange}
                          className="rounded-3 bg-light border-0"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="fw-bold small text-muted text-uppercase">
                          Website
                        </Form.Label>
                        <Form.Control
                          name="website"
                          value={pantry.website}
                          onChange={handlePantryChange}
                          className="rounded-3 bg-light border-0"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                <div>
                  <h6 className="fw-bold text-dark mb-3">Operational Details</h6>
                  <Form.Group>
                    <Form.Label className="fw-bold small text-muted text-uppercase">
                      Operating Hours
                    </Form.Label>
                    <Form.Control
                      name="hours"
                      value={pantry.hours}
                      onChange={handlePantryChange}
                      className="rounded-3 bg-light border-0"
                    />
                  </Form.Group>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* INVENTORY TAB */}
        {activeTab === "inventory" && (
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Header className="bg-white border-0 p-4 d-flex justify-content-between align-items-center border-bottom">
              <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <BoxSeam className="text-primary" /> Stock Levels
              </h4>
              <Button
                variant="primary"
                className="rounded-pill px-3 fw-bold d-flex align-items-center gap-2"
                onClick={openAddModal}
              >
                <PlusLg /> Add Item
              </Button>
            </Card.Header>
            <Table hover responsive className="mb-0 align-middle">
              <thead className="bg-light text-muted small fw-bold text-uppercase">
                <tr>
                  <th className="ps-4 py-3">Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Status</th>
                  <th className="pe-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item._id}>
                    <td className="ps-4 fw-bold">{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit || "units"}</td>
                    <td>
                      <Badge
                        bg={STATUS_VARIANT[item.status]}
                        className="bg-opacity-10 text-dark border"
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="pe-4 text-end">
                      <Button
                        variant="link"
                        className="text-primary p-0 me-3 shadow-none"
                        onClick={() => openEditModal(item)}
                      >
                        <PencilSquare size={18} />
                      </Button>
                      <Button
                        variant="link"
                        className="text-danger p-0 shadow-none"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        <Trash size={18} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        {/* PLEDGES TAB */}
        {activeTab === "pledges" && (
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Header className="bg-white border-0 p-4 border-bottom">
              <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <People className="text-primary" /> Active Pledges
              </h4>
            </Card.Header>
            <Table hover responsive className="mb-0 align-middle">
              <thead className="bg-light text-muted small fw-bold text-uppercase">
                <tr>
                  <th className="ps-4 py-3">Donor</th>
                  <th>Item Pledged</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th className="pe-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pledges.length > 0 ? (
                  pledges.map((pledge) => (
                    <tr key={pledge._id}>
                      {/* use .name because of Mongoose populate */}
                      <td className="ps-4 fw-bold">{pledge.donator?.name || "Anonymous User"}</td>
                      <td>{pledge.item?.name || "Unknown Item"}</td>
                      <td>
                        {pledge.quantity} {pledge.unit}
                      </td>
                      <td className="text-secondary small">
                        {new Date(pledge.datePledged).toLocaleDateString()}
                      </td>
                      <td className="pe-4 text-end">
                        {/* right now both Check and Trash just delete the pledge to clear it out */}
                        <Button
                          variant="link"
                          className="text-success p-0 me-3 shadow-none"
                          onClick={() => handleOpenReceive(pledge)}
                        >
                          <CheckCircle size={20} />
                        </Button>
                        <Button
                          variant="link"
                          className="text-danger p-0 shadow-none"
                          onClick={() => handleDeletePledge(pledge._id)}
                        >
                          <Trash size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No active pledges at the moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        )}
      </Container>

      {/* Shared Add/Edit Item Modal */}
      <Modal show={showItemModal} onHide={() => setShowItemModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">
            {editingItem ? "Edit Item" : "Add Inventory Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-4">
          <Form onSubmit={handleSaveItem}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-muted text-uppercase">Item Name</Form.Label>
              <Form.Control
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Canned Corn"
                className="rounded-3"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-muted text-uppercase">
                    Category
                  </Form.Label>
                  <Form.Select
                    value={formData.category}
                    id="categorySelect"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="rounded-3"
                  >
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
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-muted text-uppercase">
                    Quantity
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })
                    }
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-muted">Unit</Form.Label>
                  <Form.Select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="rounded-3"
                  >
                    <option value="">Select unit</option>
                    <option value="lbs">lbs (pounds)</option>
                    <option value="cans">cans</option>
                    <option value="boxes">boxes</option>
                    <option value="bags">bags</option>
                    <option value="units">units</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-muted text-uppercase">
                Stock Status
              </Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="rounded-3"
              >
                {Object.keys(STATUS_VARIANT).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Check
              type="checkbox"
              label="Add to Wishlist"
              checked={formData.wishlist}
              onChange={(e) => setFormData({ ...formData, wishlist: e.target.checked })}
              className="mb-4 fw-bold small text-secondary"
            />
            <Button
              type="submit"
              variant="primary"
              className="w-100 rounded-pill fw-bold py-2 shadow-sm"
            >
              {editingItem ? "Update Item" : "Save to Inventory"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* receive donation modal */}
      <Modal show={showReceiveModal} onHide={() => setShowReceiveModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Receive Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activePledge && (
            <Form onSubmit={handleConfirmReceive}>
              <div className="mb-4 text-center">
                <h5 className="text-primary mb-1">
                  {activePledge.donator?.name || "Anonymous Donor"}
                </h5>
                <p className="text-muted small">
                  Promised: {activePledge.quantity} {activePledge.unit} of {activePledge.item?.name}
                </p>
              </div>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">ACTUAL AMOUNT RECEIVED</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="number"
                    min="0"
                    value={receiveQuantity}
                    onChange={(e) => setReceiveQuantity(e.target.value)}
                    required
                  />
                  <span className="input-group-text bg-light text-muted fw-bold">
                    {activePledge.unit}
                  </span>
                </div>
                <Form.Text className="text-muted small">
                  Adjust this number if the donor brought a different amount than pledged.
                </Form.Text>
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="w-100 rounded-pill fw-bold py-2 shadow-sm"
              >
                Confirm & Update Inventory
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
