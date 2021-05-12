import { useState, useEffect, Fragment } from 'react';

import axios from 'axios';

import Header from './components/Header';
import AddItems from './components/AddItems';
import ItemList from './components/ItemList';
import Memo from './components/Memo';
import Totals from './components/Totals';

import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [APIdata, setData] = useState(null);

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

  return (
    <Container fluid>
      <Form>
        {APIdata ? (
          <Fragment>
            <Header />
            <AddItems />
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
