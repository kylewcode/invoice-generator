import { useState, useReducer, useEffect, Fragment } from 'react';

import axios from 'axios';

import Header from './components/Header';
import AddItems from './components/AddItems';
import ItemList from './components/ItemList';
import Memo from './components/Memo';
import Totals from './components/Totals';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

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
};

function formReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_LINE_ITEM':
      // console.log('Dispatched ADD_LINE_ITEM');
      // console.log(payload);
      const lineItemsCopy = state.meta.lineItems.slice();
      lineItemsCopy.push(payload);

      // React doesn't update nested state
      const updatedMeta = {
          tax: state.meta.tax,
          subtotal: state.meta.subtotal,
          lineItems: lineItemsCopy,
          memo: state.meta.memo,
      };
      console.log(updatedMeta);

      // I'm not updating state correctly here.
      return { ...state, meta: updatedMeta };

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
            <AddItems APIdata={APIdata} dispatch={dispatch} />
            <ItemList />
            <Memo />
            <Totals />
          </Fragment>
        ) : null}
      </Form>
    </Container>
  );
}

export default App;
