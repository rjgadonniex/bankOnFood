import { ForkKnife } from "react-bootstrap-icons";

const Logo = () => {
  return (
    <div className="d-flex align-items-center">
      <ForkKnife style={{ color: "#005b96" }} className="me-2" />
      <span style={{ color: "#005b96" }}>Bank</span>
      <span style={{ color: "#4CAF50" }}>On</span>
      <span style={{ color: "#005b96" }}>Food</span>
    </div>
  );
};

export default Logo;
