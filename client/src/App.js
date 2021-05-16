import { useState, useReducer, useEffect, Fragment } from 'react';

import axios from 'axios';

import Header from './components/Header';
import AddItems from './components/AddItems';
import ItemList from './components/ItemList';
import Memo from './components/Memo';
import Totals from './components/Totals';
import Error from './components/Error';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  updateLineItemQuantityByItemsDetailsQuantity,
  removeLineItemFromLineItemsByDetails,
  formatCurrency,
} from './utils/helper';

const initialFormState = {
  customer_id: '40a863f6-2108-4319-b8eb-a76affe2313c',
  meta: {
    tax: 0,
    subtotal: 0,
    lineItems: [],
    memo: 'Default memo text',
  },
  total: 0,
  url: 'https://omni.fattmerchant.com/#/bill/',
  send_now: false,
  error: { message: '' },
};

function formReducer(state, action) {
  const { type, payload } = action;
  let lineItemsCopy;
  let updatedMeta = {};

  switch (type) {
    case 'ADD_LINE_ITEM':
      lineItemsCopy = state.meta.lineItems.slice();
      lineItemsCopy.push(payload);

      // React doesn't update nested state
      updatedMeta = {
        tax: state.meta.tax,
        subtotal: state.meta.subtotal,
        lineItems: lineItemsCopy,
        memo: state.meta.memo,
      };
      return { ...state, meta: updatedMeta };

    case 'QUANTITY_CHANGE':
      lineItemsCopy = state.meta.lineItems.slice();

      const updatedQuantityLineItems =
        updateLineItemQuantityByItemsDetailsQuantity(
          lineItemsCopy,
          payload.details,
          payload.quantity
        );

      updatedMeta = {
        tax: state.meta.tax,
        subtotal: state.meta.subtotal,
        lineItems: updatedQuantityLineItems,
        memo: state.meta.memo,
      };

      return { ...state, meta: updatedMeta };

    case 'REMOVE_LINE_ITEM':
      lineItemsCopy = state.meta.lineItems.slice();

      const updatedRemovalLineItems = removeLineItemFromLineItemsByDetails(
        lineItemsCopy,
        payload
      );
      // Totals must equal zero when there are no line items
      if (updatedRemovalLineItems.length === 0) {
        updatedMeta = {
          tax: '$0.00',
          subtotal: '$0.00',
          lineItems: updatedRemovalLineItems,
          memo: state.meta.memo,
        };
        return { ...state, meta: updatedMeta, total: '$0.00' };
      }

      updatedMeta = {
        tax: state.meta.tax,
        subtotal: state.meta.subtotal,
        lineItems: updatedRemovalLineItems,
        memo: state.meta.memo,
      };
      return { ...state, meta: updatedMeta };

    case 'UPDATE_TOTALS_AND_TAX':
      const { grandTotal, tax, subTotal } = payload;

      updatedMeta = {
        tax: formatCurrency(tax),
        subtotal: formatCurrency(subTotal),
        lineItems: state.meta.lineItems,
        memo: state.meta.memo,
      };

      return { ...state, total: formatCurrency(grandTotal), meta: updatedMeta };

    case 'UPDATE_MEMO':
      updatedMeta = {
        tax: state.meta.tax,
        subtotal: state.meta.subtotal,
        lineItems: state.meta.lineItems,
        memo: payload,
      };

      return { ...state, meta: updatedMeta };

    case 'ERROR':
      return { ...state, error: { message: payload } };

    case 'CLEAR_ERROR':
      return { ...state, error: { message: '' } };

    default:
      return state;
  }
}

function App() {
  const [APIdata, setData] = useState(null);

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/item');
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid>
      <Form>
        {APIdata ? (
          <Fragment>
            <Header />
            {formState.error.message === '' ? null : (
              <Error message={formState.error.message} dispatch={dispatch} />
            )}
            <AddItems
              APIdata={APIdata}
              lineItemsState={formState.meta.lineItems}
              dispatch={dispatch}
            />
            {formState.meta.lineItems.length > 0 ? (
              <ItemList
                lineItems={formState.meta.lineItems}
                dispatch={dispatch}
              />
            ) : null}
            <Row>
              <Col>
                <Memo dispatch={dispatch} />
              </Col>
              <Col className='text-end'>
                <Totals formState={formState} dispatch={dispatch} />
              </Col>
            </Row>
          </Fragment>
        ) : null}
      </Form>
    </Container>
  );
}

export default App;
