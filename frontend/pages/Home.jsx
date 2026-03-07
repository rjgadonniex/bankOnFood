import "bootstrap/dist/css/bootstrap.min.css";
import HomeNav from "../components/HomeNav";

export default function Home() {
  return (
    <div className="bg-white">
      <HomeNav />

      {/* HERO SECTION */}
      <section className="py-5 bg-light bg-opacity-25">
        <Container className="py-5 text-center">
          <Row className="justify-content-center mb-5">
            <Col lg={8} md={10}>
              <h1 className="display-4 fw-bold mb-4 text-dark">
                Bridging the Gap Between <span className="text-primary">Need</span> and{" "}
                <span className="text-success">Abundance</span>
              </h1>
              <p className="text-secondary fs-5 px-md-4">
                BankOnFood is a donation-matching and inventory visibility platform designed to
                empower food pantries, donors, and volunteers.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 p-4 border-0 rounded-4 shadow-sm text-start">
                <div
                  className="mb-4 d-inline-flex align-items-center justify-content-center bg-light rounded-circle"
                  style={{ width: "64px", height: "64px" }}
                >
                  <Map className="text-primary" size={28} />
                </div>
                <h5 className="fw-bold">Find a Pantry</h5>
                <p className="text-muted small mb-4">
                  Locate food resources near you with real-time inventory updates.
                </p>
                <Button
                  variant="link"
                  href="/map"
                  className="p-0 mt-auto text-primary text-start text-decoration-none fw-bold"
                >
                  Open Map &rarr;
                </Button>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 p-4 border-0 rounded-4 shadow-sm text-start">
                <div
                  className="mb-4 d-inline-flex align-items-center justify-content-center bg-light rounded-circle"
                  style={{ width: "64px", height: "64px" }}
                >
                  <BoxArrowInRight className="text-success" size={28} />
                </div>
                <h5 className="fw-bold">User Login</h5>
                <p className="text-muted small mb-4">
                  Access your personal dashboard to schedule donations or volunteer shifts.
                </p>
                <Button
                  variant="link"
                  href="/login"
                  className="p-0 mt-auto text-success text-start text-decoration-none fw-bold"
                >
                  Sign In &rarr;
                </Button>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 p-4 border-0 rounded-4 shadow-sm text-start">
                <div
                  className="mb-4 d-inline-flex align-items-center justify-content-center bg-light rounded-circle"
                  style={{ width: "64px", height: "64px" }}
                >
                  <Grid className="text-dark" size={28} />
                </div>
                <h5 className="fw-bold">Pantry Managers</h5>
                <p className="text-muted small mb-4">
                  Digital tools for pantry administrators to manage inventory and operations.
                </p>
                <Button
                  variant="link"
                  href="/portal"
                  className="p-0 mt-auto text-dark text-start text-decoration-none fw-bold"
                >
                  Go to Portal &rarr;
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CHALLENGE SECTION */}
      <section className="py-5" id="problem">
        <Container className="py-5">
          <Row className="align-items-center gy-5 gx-4">
            <Col lg={6}>
              <Badge bg="danger" className="bg-opacity-10 text-danger px-3 py-2 mb-3 rounded-pill">
                THE CHALLENGE
              </Badge>
              <h2 className="fw-bold mb-4">Food Insecurity is an Urgent Issue</h2>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-start gap-3">
                  <GraphUp className="text-danger mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h6 className="fw-bold mb-1">Rising Insecurity</h6>
                    <p className="text-secondary small mb-0">
                      1 in 7 Americans rely on food pantries to meet their basic nutritional needs.
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <EyeSlash className="text-danger mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h6 className="fw-bold mb-1">Lack of Awareness</h6>
                    <p className="text-secondary small mb-0">
                      Many families in need are unaware of the pantry locations available right in
                      their neighborhood.
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <Cpu className="text-danger mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h6 className="fw-bold mb-1">Operational Gaps</h6>
                    <p className="text-secondary small mb-0">
                      Local pantries struggle to scale without modern digital tools to track
                      donations and inventory.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="bg-light rounded-4 overflow-hidden shadow-sm">
                <img
                  src="https://media.istockphoto.com/id/1200727597/photo/diverse-volunteers-packing-donation-boxes-with-canned-food-in-food-bank.jpg?s=612x612&w=0&k=20&c=jpz4iytWjwfKy_EpTdcvcFO1kGJgVk6pPX7XRIG72cE="
                  alt="Volunteers packing food"
                  className="img-fluid w-100"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-5 bg-light bg-opacity-25" id="solution">
        <Container className="py-5">
          <Row className="align-items-center gy-5 gx-4 flex-lg-row-reverse">
            <Col lg={6}>
              <Badge
                bg="primary"
                className="bg-opacity-10 text-primary px-3 py-2 mb-3 rounded-pill"
              >
                OUR SOLUTION
              </Badge>
              <h2 className="fw-bold mb-4">Empowering Communities with Smart Tools</h2>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3 p-3 bg-white border rounded-3 shadow-sm">
                  <Search className="text-primary flex-shrink-0" size={20} />
                  <span className="fw-medium text-dark">
                    Searchable, real-time map of local food pantries.
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3 p-3 bg-white border rounded-3 shadow-sm">
                  <Grid className="text-success flex-shrink-0" size={20} />
                  <span className="fw-medium text-dark">
                    Live inventory visibility for donors and clients.
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3 p-3 bg-white border rounded-3 shadow-sm">
                  <CalendarCheck className="text-primary flex-shrink-0" size={20} />
                  <span className="fw-medium text-dark">
                    Seamless scheduling for volunteers and donations.
                  </span>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="bg-light rounded-4 overflow-hidden shadow-sm">
                <img
                  src="https://i.pinimg.com/736x/b5/fc/ed/b5fced8b4800bcfd051b5f007e24321b.jpg"
                  alt="Box with plant"
                  className="img-fluid w-100"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
