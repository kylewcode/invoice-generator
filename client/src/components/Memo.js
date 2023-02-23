import Form from "react-bootstrap/Form";

function Memo({ dispatch }) {
  const handleBlur = (event) => {
    dispatch({ type: "UPDATE_MEMO", payload: event.target.value });
  };

  return (
    <>
      <Form.Group controlId="memo-text-area">
        <Form.Label className="light-blue fw-bold">Memo</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter your memo..."
          cols={2}
          rows={3}
          onBlur={(event) => handleBlur(event)}
        />
      </Form.Group>
    </>
  );
}

export default Memo;
