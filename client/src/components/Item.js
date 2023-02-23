import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {
  calculateTotalFromQuantityAndPrice,
  formatCurrency,
  checkInStateForDuplicateLineItem,
} from "../utils/helper";

function Item({ item, lineItemsState, dispatch }) {
  const initialState = {
    details: item.details,
    price: formatCurrency(item.price),
    quantity: item.quantity,
    total: formatCurrency(
      calculateTotalFromQuantityAndPrice(item.quantity, item.price)
    ),
  };

  const [state, setState] = useState(() => initialState);

  const addLineItemToInvoice = () => {
    const isDuplicate = checkInStateForDuplicateLineItem(lineItemsState, state);
    if (isDuplicate) {
      const errorMessage =
        "You cannot add duplicate line items to the invoice.";
      dispatch({ type: "ERROR", payload: errorMessage });
      return;
    }
    dispatch({ type: "ADD_LINE_ITEM", payload: state });
  };

  const updateQuantityAndTotalInState = (quantity) => {
    const newTotal = calculateTotalFromQuantityAndPrice(quantity, state.price);
    setState({ ...state, quantity: quantity, total: formatCurrency(newTotal) });
  };

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value);
    updateQuantityAndTotalInState(quantity);
  };

  return (
    <Row className="text-start justify-content-start align-items-center my-3">
      <Col xs={5}>
        <div name="details">{state.details}</div>
      </Col>
      <Col>
        <Form.Control
          name="quantity"
          type="number"
          defaultValue="1"
          min="1"
          onChange={(event) => handleQuantityChange(event)}
        />
      </Col>
      <Col>
        <div name="price">{state.price}</div>
      </Col>
      <Col>
        <div name="total">{state.total}</div>
      </Col>
      <Col className="text-end">
        <Button className="button-style" onClick={addLineItemToInvoice}>
          +
        </Button>
      </Col>
    </Row>
  );
}

export default Item;
