import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function Error({ message, dispatch }) {
  return (
    <>
      <Alert variant="warning" className="text-center mb-0">
        <p className="me-5 d-inline">{message}</p>
        <Button
          variant="outline-dark"
          onClick={() => dispatch({ type: "CLEAR_ERROR" })}
        >
          X
        </Button>
      </Alert>
    </>
  );
}

export default Error;
