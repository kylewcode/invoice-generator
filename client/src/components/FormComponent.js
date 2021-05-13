import { useState, Fragment } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FormComponent({ APIdata }) {
  // State
  // Need state for the imported line items that are used to add to the form.
  const [lineItemsState, updateLineItemsState] = useState(() => APIdata );
  
  // Need state for the form itself.

  const createLineItemsJSX = APIdata => {
    return (
      <Fragment>
        <Row className='text-end justify-content-md-right fw-bold'>
          <Col>Details</Col>
          <Col xs={2}>Price</Col>
          <Col xs={1}>Quantity</Col>
          <Col xs={2}>Total</Col>
          <Col xs={1}>Add</Col>
        </Row>
        {APIdata.map((item, index) => {
          return (
            <Row key={index} className='text-end justify-content-md-right'>
              <Col>
                <div>{item.details}</div>
              </Col>
              <Col xs={2}>
                <div>{item.price}</div>
              </Col>
              <Col xs={1}>
                <Form.Control
                  type='number'
                  defaultValue={item.quantity}
                  min='1'
                />
              </Col>
              <Col xs={2}>
                <div>{item.total}</div>
              </Col>
              <Col xs={1}>
                <Button>+</Button>
              </Col>
            </Row>
          );
        })}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <h2 className="text-center">Add to Invoice</h2>
        <Row>
          <Col>{APIdata ? createLineItemsJSX(APIdata) : null}</Col>
        </Row>
        <h2 className="text-center">Invoice Submittal</h2>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId='formGroupMemo'>
              <Form.Label>Memo</Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
          </Col>
          <Col className='text-end'>
            <p>SUB TOTAL</p>
            {/* <div>{subTotal}</div> */}
            <p>TAX</p>
            {/* <div>{tax}</div> */}
            <p>GRAND TOTAL</p>
            {/* <div>{grandTotal}</div> */}
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant='info' type='submit'>
              Submit Invoice
            </Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
}

export default FormComponent;
