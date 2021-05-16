import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { calculateTotalFromQuantityAndPrice, formatCurrency } from '../utils/helper';

function Item({ item, dispatch }) {
  const initialState = {
    details: item.details,
    price: formatCurrency(item.price),
    quantity: item.quantity,
    total: formatCurrency(calculateTotalFromQuantityAndPrice(item.quantity, item.price)),
  };

  // Each item has its own state which is sent to App when the item is added to the form.
  const [state, setState] = useState(() => initialState);

  const addLineItemToInvoice = () => {
    dispatch({ type: 'ADD_LINE_ITEM', payload: state });
  };

  const updateQuantityAndTotalInState = quantity => {
    const newTotal = calculateTotalFromQuantityAndPrice(quantity, state.price);
    setState({ ...state, quantity: quantity, total: formatCurrency(newTotal) });
  };

  const handleQuantityChange = event => {
    const quantity = parseInt(event.target.value);
    updateQuantityAndTotalInState(quantity);
  };

  return (
    <Row className='text-end justify-content-md-right'>
      <Col>
        <div name='details'>{state.details}</div>
      </Col>
      <Col xs={2}>
        <div name='price'>{state.price}</div>
      </Col>
      <Col xs={1}>
        <Form.Control
          name='quantity'
          type='number'
          defaultValue='1'
          min='1'
          onChange={event => handleQuantityChange(event)}
        />
      </Col>
      <Col xs={2}>
        <div name='total'>{state.total}</div>
      </Col>
      <Col xs={1}>
        <Button onClick={addLineItemToInvoice}>+</Button>
      </Col>
    </Row>
  );
}

export default Item;
