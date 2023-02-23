import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header() {
  return (
    <>
      <Row className="text-white justify-content-between align-items-end">
        <Col>
          <h1 className="app-title">
            Invoice
            <br />
            <span className="m-4">Generator</span>
          </h1>
        </Col>
        <Col className="p-0 text-end">
          <p className="invoice-number">INVOICE #0001</p>
        </Col>
      </Row>
    </>
  );
}

export default Header;
