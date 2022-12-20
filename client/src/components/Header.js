import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header() {
  return (
    <div className="mt-3">
      <Row className="mb-5 border">
        <Col className="d-flex justify-content-evenly py-4">
          <h1>Invoice Generator</h1>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <p>INVOICE NO: 93757430</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>BILL TO:</p>
          <p>ABIGAYLE BOOKER</p>
          <p>440 E. Foxrun Drive Oklahoma City, OK 73112</p>
          <p>Email: someone@example.com</p>
          <p>Phone: (999) 999-9999</p>
        </Col>
        <Col>
          <p>FROM:</p>
          <p>John Doe</p>
          <p>10308 Kenny Drive, Orlando, FL 32817</p>
          <p>Email: john.doe@gmail.com</p>
          <p>Phone: (123) 456-7890</p>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
