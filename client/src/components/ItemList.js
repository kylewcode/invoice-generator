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
    <div className="py-3 colored-underline">
      <h2 className="py-4 light-blue">Your Products/Services</h2>
      <Row className="m-0 text-start justify-content-start fw-bold colored-underline light-blue">
        <Col xs={5}>Details</Col>
        <Col>Quantity</Col>
        <Col>Price</Col>
        <Col>Total</Col>
        <Col>Remove</Col>
      </Row>
      {lineItems.map((item, index) => {
        return (
          <Fragment key={index}>
            <Row className="text-start justify-content-start my-3">
              <Col xs={5}>
                <div name="details">{item.details}</div>
              </Col>
              <Col>
                <Form.Control
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  min="1"
                  data-details={item.details}
                  onChange={(event) => handleQuantityChange(event)}
                />
              </Col>
              <Col>
                <div name="price">{item.price}</div>
              </Col>
              <Col>
                <div name="total">{item.total}</div>
              </Col>
              <Col className="text-end">
                <Button
                  className="button-style"
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
