import {useState, useEffect} from 'react'

import axios from 'axios'

import Header from './components/Header';
import FormComponent from './components/FormComponent';

import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form'

function App() {
  const [data, setData] = useState(null);

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
      <Header />
      {/* <FormComponent APIdata={data}/> */}
    </Container>
  );
}

export default App;
