import { Fragment } from 'react';

import Form from 'react-bootstrap/Form';

function Memo({ dispatch }) {
  const handleBlur = event => {
    dispatch({ type: 'UPDATE_MEMO', payload: event.target.value });
  };

  return (
    <Fragment>
      <Form.Group controlId='memo-text-area'>
        <Form.Label>Memo</Form.Label>
        <Form.Control
          as='textarea'
          cols={2}
          rows={3}
          onBlur={event => handleBlur(event)}
        />
      </Form.Group>
    </Fragment>
  );
}

export default Memo;
