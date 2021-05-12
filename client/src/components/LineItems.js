import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function LineItems() {
  const [data, setData] = useState(null);

  const createLineItemsJSX = lineItems => {
    return (
      <Fragment>
        <Row className='text-end justify-content-md-right fw-bold'>
          <Col>Details</Col>
          <Col xs={2}>Price</Col>
          <Col xs={1}>Quantity</Col>
          <Col xs={2}>Total</Col>
          <Col xs={1}>Add</Col>
        </Row>
        {lineItems.map((item, index) => {
          return (
            <Row className='text-end justify-content-md-right'>
              <Col>
                <div key={index}>{item.details}</div>
              </Col>
              <Col xs={2}>
                <div key={index}>{item.price}</div>
              </Col>
              <Col xs={1}>
                <div key={index}>{item.quantity}</div>
              </Col>
              <Col xs={2}>
                <div key={index}>{item.total}</div>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/item');
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return <Fragment>{data ? createLineItemsJSX(data) : null}</Fragment>;
}

export default LineItems;
