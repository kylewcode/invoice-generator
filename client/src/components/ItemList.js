import { Fragment, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  calculateTaxAndTotalsByItemTotalsAndTaxRate,
  getLineItemsTotals,
} from "../utils/helper";

function ItemList({ lineItems, dispatch }) {
  // Updates App state with the subtotal, tax, and grand total of all added line items.
  useEffect(() => {
    const itemsTotals = getLineItemsTotals(lineItems);
    const taxAndTotals = calculateTaxAndTotalsByItemTotalsAndTaxRate(
      itemsTotals,
      2.5
    );
    dispatch({ type: "UPDATE_TOTALS_AND_TAX", payload: taxAndTotals });
  }, [lineItems, dispatch]);

  const handleQuantityChange = (event) => {
    const payloadData = {
      quantity: event.target.value,
      details: event.target.dataset.details,
    };
    dispatch({ type: "QUANTITY_CHANGE", payload: payloadData });
  };

  const removeLineItemFromInvoice = (event) => {
    dispatch({
      type: "REMOVE_LINE_ITEM",
      payload: event.target.dataset.details,
    });
  };

  return (
    <div>
      <h2>Your Products/Services</h2>
      <Row className="text-end justify-content-md-right fw-bold">
        <Col>Details</Col>
        <Col xs={2}>Price</Col>
        <Col xs={1}>Quantity</Col>
        <Col xs={2}>Total</Col>
        <Col xs={1}>Remove</Col>
      </Row>
      {lineItems.map((item, index) => {
        return (
          <Fragment key={index}>
            {/* Items here do not need their own state since they inherit state from App */}
            <Row className="text-end justify-content-md-right">
              <Col>
                <div name="details">{item.details}</div>
              </Col>
              <Col xs={2}>
                <div name="price">{item.price}</div>
              </Col>
              <Col xs={1}>
                <Form.Control
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  min="1"
                  data-details={item.details}
                  onChange={(event) => handleQuantityChange(event)}
                />
              </Col>
              <Col xs={2}>
                <div name="total">{item.total}</div>
              </Col>
              <Col xs={1}>
                <Button
                  data-details={item.details}
                  onClick={(event) => removeLineItemFromInvoice(event)}
                >
                  -
                </Button>
              </Col>
            </Row>
          </Fragment>
        );
      })}
    </div>
  );
}

export default ItemList;
