import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, InputGroup, Card, Nav, Spinner } from "react-bootstrap";
import { Search as SearchIcon, Map as MapIcon, ListUl, ChevronRight } from "react-bootstrap-icons";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";

const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }],
};

const haversineDistance = (a, b) => {
  const R = 3958.8;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

const PantryCard = ({ pantry, isSelected, onSelect }) => (
  <Card
    className={`border-0 shadow-sm rounded-4${isSelected ? " border border-primary" : ""}`}
    onClick={() => onSelect(pantry)}
    style={{ cursor: "pointer" }}
  >
    <Card.Body className="p-3 d-flex justify-content-between align-items-center">
      <div>
        <h6 className="fw-bold mb-1">{pantry.name}</h6>
        <div className={`text-${pantry.stockColor} small fw-semibold`}>● {pantry.stockStatus}</div>
        {pantry.distance != null && (
          <div className="text-muted small mt-1">{pantry.distance.toFixed(1)} miles away</div>
        )}
      </div>
      <Link
        to={`/pantry/${pantry.id}`}
        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-2 text-primary"
        style={{ width: 36, height: 36 }}
        onClick={(e) => e.stopPropagation()}
        title={`View ${pantry.name} details`}
      >
        <ChevronRight size={18} />
      </Link>
    </Card.Body>
  </Card>
);

export default function SearchPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(13);
  const [view, setView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPantry, setSelectedPantry] = useState(null);
  const [dbPantries, setDbPantries] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/Pantries`)
      .then((res) => {
        const formatted = res.data.map((p) => ({
          id: p._id,
          name: p.name || "Unnamed Pantry",
          stockStatus: "Accepting Donations", // Can maybe add a toggle or something like that for this later
          stockColor: "success",
          lat: parseFloat(p.latitude) || 29.652, // defaulted view around UF
          lng: parseFloat(p.longitude) || -82.325,
          zip: p.address || "",
        }));
        setDbPantries(formatted);
      })
      .catch((err) => console.error("Error fetching pantries:", err));
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(({ coords }) => {
      const loc = { lat: coords.latitude, lng: coords.longitude };
      setUserLocation(loc);
      setMapCenter(loc);
    });
  }, []);

  const filteredPantries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const results = dbPantries.filter(
      (p) => p.name.toLowerCase().includes(query) || p.zip.includes(query),
    );
    if (!userLocation) return results;
    return results
      .map((p) => ({ ...p, distance: haversineDistance(userLocation, p) }))
      .sort((a, b) => a.distance - b.distance);
  }, [searchQuery, userLocation, dbPantries]);

  const handleSelectPantry = (pantry) => {
    setMapCenter({ lat: pantry.lat, lng: pantry.lng });
    setZoom(15);
    setSelectedPantry(pantry);
    if (isMobile) setView("map");
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setView("list");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white vh-100 d-flex flex-column overflow-hidden">
      <NavigationBar />

      {/* Mobile tab toggle */}
      <div className="d-md-none border-bottom bg-white flex-shrink-0" style={{ marginTop: 64 }}>
        <Nav fill variant="pills" className="p-2 gap-2">
          {["list", "map"].map((tab) => (
            <Nav.Item key={tab}>
              <Nav.Link
                active={view === tab}
                onClick={() => setView(tab)}
                className="d-flex align-items-center justify-content-center gap-2 rounded-pill text-capitalize"
              >
                {tab === "list" ? <ListUl /> : <MapIcon />} {tab}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>

      {/* Main Content Area */}
      <Container
        fluid
        className="p-0 flex-grow-1"
        style={{
          height: isMobile ? "calc(100vh - 120px)" : "calc(100vh - 64px)",
          marginTop: isMobile ? 0 : 64,
        }}
      >
        <Row className="h-100 g-0 flex-nowrap">
          {/* Sidebar */}
          <Col
            md={5}
            lg={4}
            className={`h-100 flex-column border-end bg-white shadow-sm z-1 ${
              view === "list" ? "d-flex" : "d-none d-md-flex"
            }`}
          >
            <div className="p-3 p-md-4 border-bottom bg-white flex-shrink-0">
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0 text-muted">
                  <SearchIcon />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by pantry name or zip code"
                  className="bg-light border-start-0 shadow-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </div>

            <div
              className="flex-grow-1 overflow-auto bg-light bg-opacity-10"
              style={{ minHeight: 0 }}
            >
              <div className="p-3 p-md-4 d-flex flex-column gap-3">
                {filteredPantries.length > 0 ? (
                  filteredPantries.map((pantry) => (
                    <PantryCard
                      key={pantry.id}
                      pantry={pantry}
                      isSelected={selectedPantry?.id === pantry.id}
                      onSelect={handleSelectPantry}
                    />
                  ))
                ) : (
                  <div className="text-center p-5 text-muted">No pantries found.</div>
                )}
              </div>
            </div>
          </Col>

          {/* Map Area */}
          <Col
            md={7}
            lg={8}
            className={`h-100 position-relative ${view === "map" ? "d-block" : "d-none d-md-block"}`}
          >
            {!isLoaded ? (
              <div className="h-100 d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={zoom}
                options={MAP_OPTIONS}
              >
                {filteredPantries.map((p) => (
                  <Marker
                    key={p.id}
                    position={{ lat: p.lat, lng: p.lng }}
                    onClick={() => handleSelectPantry(p)}
                  />
                ))}
              </GoogleMap>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
