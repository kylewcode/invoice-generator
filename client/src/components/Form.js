import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Body() {
  const subTotal = 100;
  const tax = 20;
  const grandTotal = subTotal + tax;

  return (
    <div>
      <Row>
        <Col>Get line items</Col>
      </Row>

      {/* <Form>
        <Row>
          <Form.Group controlId='formGroupMemo'>
            <Form.Label>Memo</Form.Label>
            <Form.Control as='textarea' rows={3} />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId='formGroupDetails'>
              <Form.Label>Details</Form.Label>
              <Form.Control type='text' />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='formGroupQuantity'>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type='number' min='1' />
            </Form.Group>
          </Col>
          <Col>2</Col>
          <Col>3</Col>
        </Row>
        <Row>
          <Col>
            <Button variant='info' type='submit'>
              Submit Invoice
            </Button>
          </Col>
          <Col className='text-end'>
            <p>SUB TOTAL</p>
            <div>{subTotal}</div>
            <p>TAX</p>
            <div>{tax}</div>
            <p>GRAND TOTAL</p>
            <div>{grandTotal}</div>
          </Col>
        </Row>
      </Form> */}
    </div>
  );
}

export default Body;
