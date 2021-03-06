import logo from '../img/staxpaybyfattmerchant.png';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Header() {
  return (
    <div className="mt-3">
      <Row className="mb-4 border-bottom border-top border-2 rounded-pill">
        <Col className="d-flex justify-content-evenly py-4">
          <Image src={logo} alt='Stax Pay by Fat Merchant' thumbnail />
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <p>INVOICE NO: 93757430</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>BILL TO:</p>
          <p>ABIGAYLE BOOKER</p>
          <p>440 E. Foxrun Drive Oklahoma City, OK 73112</p>
          <p>Email: daniel+qdemoAbigayle.Booker@fattmerchant.com</p>
          <p>Phone: (999) 999-9999</p>
        </Col>
        <Col>
          <p>FROM:</p>
          <p>John Doe</p>
          <p>10308 Kenny Drive, Orlando, FL 32817</p>
          <p>Email: john.doe@gmail.com</p>
          <p>Phone: (123) 456-7890</p>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
