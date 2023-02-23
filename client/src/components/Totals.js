import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Totals({
  formState: {
    total,
    meta: { tax, subtotal },
  },
}) {
  return (
    <>
      <Row>
        <Col>SUB TOTAL:</Col>
        <Col className="light-blue fw-bold" xs={5}>
          {subtotal}
        </Col>
      </Row>
      <Row>
        <Col>TAX:</Col>
        <Col className="light-blue fw-bold" xs={5}>
          {tax}
        </Col>
      </Row>
      <Row>
        <Col>GRAND TOTAL:</Col>
        <Col className="light-blue fw-bold" xs={5}>
          {total}
        </Col>
      </Row>
    </>
  );
}

export default Totals;
