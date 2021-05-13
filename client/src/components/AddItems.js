import { Fragment } from 'react';

import Item from './Item';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AddItems({ APIdata, dispatch }) {
  return (
    <div>
      <Row className='text-end justify-content-md-right fw-bold'>
        <Col>Details</Col>
        <Col xs={2}>Price</Col>
        <Col xs={1}>Quantity</Col>
        <Col xs={2}>Total</Col>
        <Col xs={1}>Add</Col>
      </Row>
      {APIdata.map((item, index) => {
        return (
          <Fragment key={index}>
            <Item item={item} dispatch={dispatch} />
          </Fragment>
        );
      })}
    </div>
  );
}

export default AddItems;
