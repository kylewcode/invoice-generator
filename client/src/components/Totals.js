import { Fragment } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Totals({
  formState: {
    total,
    meta: { tax, subtotal },
  },
}) {
  return (
    <Fragment>
      <Row>
        <Col>
          SUB TOTAL: {subtotal}
        </Col>
      </Row>
      <Row>
        <Col>
          TAX: {tax}
        </Col>
      </Row>
      <Row>
        <Col>GRAND TOTAL: {total}</Col>
      </Row>
    </Fragment>
  );
}

export default Totals;
