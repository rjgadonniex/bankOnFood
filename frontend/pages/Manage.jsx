import axios from "axios";
import React, { useEffect, useState } from "react";
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


const pantry = "69d16f753c6bf22ef0bf996f"; //hardcoded
let inventoryData = [];
let parseInv = [];
let catData = [];
let items =[];
//fetch data for pantry
axios.get(`http://localhost:5001/api/item/${pantry}`)
  .then(response => {
    console.log("All items:", response.data);
    inventoryData = response.data;
    //get the category for items
    //NEEDS TO BE FIXED WITH ASYNC REQUEST
  for(var i=0; i<inventoryData.length; i++){
    var item = inventoryData[i];
    parseInv[i] = {id: i+1, dataID:item._id, name: item.name, category: item.category, 
    quantity: item.quantity, unit: item.unit, 
    status: item.status, wishlist: item.wishlist}
  }

  for (var i=0; i<inventoryData.length; i++){
  axios.get(`http://localhost:5001/api/category/id/${inventoryData[i].category}`)
  .then(response2 => {
    console.log(response2.data);
    parseInv[i].category = response2.data[0].description;
  })
  .catch(error => {
    console.error("Error fetching items:", error);
  });
}

  }

)
  .catch(error => {
    console.error("Error fetching items:", error);
  });




  
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

const STATUS_VARIANT = {
  "IN STOCK": "success",
  "RUNNING LOW": "warning",
  CRITICAL: "danger",
};



export default function Manage() {
  
  const { id } = useParams();
  const [pantry, setPantry] = useState(INITIAL_PANTRY_DATA[id] || INITIAL_PANTRY_DATA[1]);
  const [activeTab, setActiveTab] = useState("profile");

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

  const handleDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setPantry((prev) => ({
        ...prev,
        inventory: prev.inventory.filter((item) => item.id !== itemId),
      }));
    }
  };

   const handleSaveItem = (e) => {
    e.preventDefault();
    if (editingItem) {
      setPantry((prev) => ({
        ...prev,
        inventory: prev.inventory.map((item) =>
          item.id === editingItem.id ? { ...formData, id: item.id } : item,
        ),
      }));
    } else {
      const newItem = { ...formData, id: Date.now() };
      setPantry((prev) => ({
        ...prev,
        inventory: [...prev.inventory, newItem],
      }));
      try {
        alert('test');
      const formName = formData.name;
      const formQuantity = formData.quantity;
      const formUnit = formData.unit;
      const formStatus = formData.status;
      const formWishlist = formData.wishlist;
      const category = "69d17a3425b00026dd9aef2e"; //HARDCODED VALUE
      const pantryID = "69d16f753c6bf22ef0bf996f";  //HARDCODED VALUE
      axios.post('http://localhost:5001/api/item/', { 
        name:formName, 
        quantity: formQuantity, 
        status:formStatus, 
        pantryID:pantryID, 
        category:category, 
        unit:formUnit, 
        wishlist:formWishlist });
      console.log('Item added');
    } catch (error) {
      console.error('Error posting data:', error);
    }
    
    }
     
    setShowItemModal(false);
  };

  const handleDeletePledge = (pledgeId) => {
    setPantry((prev) => ({
      ...prev,
      pledges: prev.pledges.filter((p) => p.id !== pledgeId),
    }));
  };





  return (
    <div className="bg-light min-vh-100">
      <NavigationBar />
      <Container style={{ paddingTop: "100px" }} className="pb-5">
        <Link
          to={`/pantry/${id || 1}`}
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
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Profile updated!"); // Replace with your save logic
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
                {pantry.inventory.map((item) => (
                  <tr key={item.id}>
                    <td className="ps-4 fw-bold">{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit || 'units'}</td>
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
                        onClick={() => handleDeleteItem(item.id)}
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
                  <th>Qty</th>
                  <th>Date</th>
                  <th className="pe-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pantry.pledges.map((pledge) => (
                  <tr key={pledge.id}>
                    <td className="ps-4 fw-bold">{pledge.donor}</td>
                    <td>{pledge.item}</td>
                    <td>{pledge.quantity}</td>
                    <td className="text-secondary small">{pledge.date}</td>
                    <td className="pe-4 text-end">
                      <Button variant="link" className="text-success p-0 me-3 shadow-none">
                        <CheckCircle size={20} />
                      </Button>
                      <Button
                        variant="link"
                        className="text-danger p-0 shadow-none"
                        onClick={() => handleDeletePledge(pledge.id)}
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
                    id = "categorySelect"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="rounded-3"
                  >
                    <option>Non-Perishables</option>
                    <option>Dry Goods</option>
                    <option>Produce</option>
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
    </div>
  );
}
