import { Fragment } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Error({ message, dispatch }) {
  return (
    <Fragment>
      <Alert variant='warning'>
        {message}
        <Button
          variant='outline-dark'
          onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
        >
          X
        </Button>
      </Alert>
    </Fragment>
  );
}

export default Error;
