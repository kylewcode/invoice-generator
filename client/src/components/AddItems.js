import { Fragment } from "react";

import Item from "./Item";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AddItems({ APIdata, lineItemsState, dispatch }) {
  return (
    <div className="pb-3 colored-underline">
      <h2 className="text-left py-4 light-blue">Choose your Product/Service</h2>
      <Row className="m-0 text-start justify-content-start fw-bold colored-underline light-blue">
        <Col xs={5}>Details</Col>
        <Col>Quantity</Col>
        <Col>Price</Col>
        <Col>Total</Col>
        <Col>Add</Col>
      </Row>
      {APIdata.map((item, index) => {
        return (
          <Fragment key={index}>
            <Item
              item={item}
              lineItemsState={lineItemsState}
              dispatch={dispatch}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

export default AddItems;
