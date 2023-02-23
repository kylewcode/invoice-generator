import Alert from "react-bootstrap/Alert";

function Success({ message, dispatch }) {
  return (
    <>
      <Alert variant="success" className="text-center mb-0">
        {message}
      </Alert>
    </>
  );
}

export default Success;
