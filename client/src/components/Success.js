import { Fragment } from 'react';

import Alert from 'react-bootstrap/Alert';

function Success({ message, dispatch }) {
  return (
    <Fragment>
      <Alert variant='success' className="text-center mb-0">
        {message}
      </Alert>
    </Fragment>
  );
}

export default Success;
