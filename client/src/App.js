import { useState, useReducer, useEffect } from "react";
import "./styles/App.css";
import axios from "axios";

import Header from "./components/Header";
import AddItems from "./components/AddItems";
import ItemList from "./components/ItemList";
import Memo from "./components/Memo";
import Totals from "./components/Totals";
import Error from "./components/Error";
import Success from "./components/Success";

import Modal from "react-modal";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {
  updateLineItemQuantityByItemsDetailsQuantity,
  removeLineItemFromLineItemsByDetails,
  formatCurrency,
  convertCurrencyDataTypes,
} from "./utils/helper";

Modal.setAppElement("#root");

const initialFormState = {
  customer_id: "40a863f6-2108-4319-b8eb-a76affe2313c",
  meta: {
    tax: 0,
    subtotal: 0,
    lineItems: [],
    memo: "",
  },
  total: 0,
  url: "https://www.example.com",
  send_now: false,
  error: { message: "" },
  success: { message: "" },
};

function formReducer(state, action) {
  const { type, payload } = action;
  let lineItemsCopy;
  let updatedMeta = {};

  switch (type) {
    case "ADD_LINE_ITEM":
      lineItemsCopy = state.meta.lineItems.slice();
      lineItemsCopy.push(payload);

      // React doesn't update nested state
      updatedMeta = {
        tax: state.meta.tax,
        subtotal: state.meta.subtotal,
        lineItems: lineItemsCopy,
        memo: state.meta.memo,
      };
      return { ...state, meta: updatedMeta };

    case "QUANTITY_CHANGE":
      lineItemsCopy = state.meta.lineItems.slice();

      const updatedQuantityLineItems =
        updateLineItemQuantityByItemsDetailsQuantity(
          lineItemsCopy,
          payload.details,
          payload.quantity
        );

      updatedMeta = {
        tax: state.meta.tax,
        subtotal: state.meta.subtotal,
        lineItems: updatedQuantityLineItems,
        memo: state.meta.memo,
      };

      return { ...state, meta: updatedMeta };

    case "REMOVE_LINE_ITEM":
      lineItemsCopy = state.meta.lineItems.slice();

      const updatedRemovalLineItems = removeLineItemFromLineItemsByDetails(
        lineItemsCopy,
        payload
      );
      // Totals must equal zero when there are no line items
      if (updatedRemovalLineItems.length === 0) {
        updatedMeta = {
          tax: "$0.00",
          subtotal: "$0.00",
          lineItems: updatedRemovalLineItems,
          memo: state.meta.memo,
        };
        return { ...state, meta: updatedMeta, total: "$0.00" };
      }

      updatedMeta = {
        tax: state.meta.tax,
        subtotal: state.meta.subtotal,
        lineItems: updatedRemovalLineItems,
        memo: state.meta.memo,
      };
      return { ...state, meta: updatedMeta };

    case "UPDATE_TOTALS_AND_TAX":
      const { grandTotal, tax, subTotal } = payload;

      updatedMeta = {
        tax: formatCurrency(tax),
        subtotal: formatCurrency(subTotal),
        lineItems: state.meta.lineItems,
        memo: state.meta.memo,
      };

      return { ...state, total: formatCurrency(grandTotal), meta: updatedMeta };

    case "UPDATE_MEMO":
      updatedMeta = {
        tax: state.meta.tax,
        subtotal: state.meta.subtotal,
        lineItems: state.meta.lineItems,
        memo: payload.trim(),
      };

      return { ...state, meta: updatedMeta };

    case "ERROR":
      return { ...state, error: { message: payload } };

    case "CLEAR_ERROR":
      return { ...state, error: { message: "" } };

    case "SUBMIT_SUCCESS":
      return { ...state, success: { message: "Invoice submitted!" } };

    case "RESET_FORM":
      window.location.reload(false);
      break;

    default:
      return state;
  }
}

function App() {
  const [APIdata, setData] = useState(null);

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get('https://kylewcode-invoice-generator.herokuapp.com/api/item');
        const res = await axios.get("http://localhost:5000/api/item");
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // If no line items or memo text has been added, prevent submission by throwing an error
    if (
      formState.meta.lineItems.length === 0 ||
      formState.meta.memo.trim() === ""
    ) {
      dispatch({
        type: "ERROR",
        payload:
          "You have to add at least one line item and write a memo before submitting the invoice.",
      });
      return;
    }

    const {
      total,
      meta: { tax, subtotal, lineItems },
    } = formState;

    const extractedFormData = {
      subtotal,
      tax,
      total,
      lineItems,
    };

    // Most currency needs to be converted to Number. total may remain a string with no '$'
    const convertedCurrencyFormData =
      convertCurrencyDataTypes(extractedFormData);

    const convertedSubtotal = convertedCurrencyFormData.subtotal;
    const convertedTax = convertedCurrencyFormData.tax;
    const convertedTotal = convertedCurrencyFormData.total;
    const convertedLineItems = convertedCurrencyFormData.lineItems;

    const body = {
      customer_id: "40a863f6-2108-4319-b8eb-a76affe2313c",
      meta: {
        tax: convertedTax,
        subtotal: convertedSubtotal,
        lineItems: convertedLineItems,
        memo: formState.meta.memo,
      },
      total: convertedTotal,
      url: "https://omni.fattmerchant.com/#/bill/",
      send_now: false,
    };

    try {
      // await axios.post('https://kylewcode-invoice-generator.herokuapp.com/api/invoice', body);
      await axios.post("http://localhost:5000/api/invoice", body);
      // Notify success
      dispatch({ type: "SUBMIT_SUCCESS" });
      // Posted invoices have UI that exists within the StaxPay application. Since there may not be access to that application I
      //  have made some UI to display on the client the data that was submitted to create the invoice.
      setTimeout(() => {
        openModal();
        return;
      }, 3000);
      // Reset state. This was the original application behavior when there was no modal.
      // setTimeout(() => {
      //   dispatch({ type: 'RESET_FORM' });
      // }, 10000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const displayLineItems = (lineItems) => {
    return lineItems.map((item, index) => {
      return (
        <li key={index}>
          Details: {item.details} | Quantity: {item.quantity} | Price:{" "}
          {item.price} | Total: {item.total}
        </li>
      );
    });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <>
      <Container className="p-0">
        <Header />
      </Container>
      <Container fluid className="form-container p-4">
        <Modal isOpen={modalIsOpen}>
          <h2>Here is the data you submitted to create an invoice.</h2>
          <h3>Customer Id</h3>
          <p>{formState.customer_id}</p>
          <h3>Tax</h3>
          <p>{formState.meta.tax}</p>
          <h3>Subtotal</h3>
          <p>{formState.meta.subtotal}</p>
          <h3>Line Items</h3>
          <ul>{displayLineItems(formState.meta.lineItems)}</ul>
          <h3>Memo</h3>
          <p>{formState.meta.memo}</p>
          <h3>Total</h3>
          <p>{formState.total}</p>
          <h3>URL</h3>
          <p>{formState.url}</p>
          <h3>Send Now</h3>
          <p>{formState.send_now.toString()}</p>
          <button type="button" onClick={resetForm}>
            Reset Form
          </button>
        </Modal>
        <Form onSubmit={(event) => handleSubmit(event)}>
          {APIdata ? (
            <>
              <AddItems
                APIdata={APIdata}
                lineItemsState={formState.meta.lineItems}
                dispatch={dispatch}
              />
              {formState.meta.lineItems.length > 0 ? (
                <ItemList
                  lineItems={formState.meta.lineItems}
                  dispatch={dispatch}
                />
              ) : null}
              <Row className="mt-5">
                <Col>
                  <Memo dispatch={dispatch} />
                </Col>
                <Col className="text-end pe-5">
                  <Totals formState={formState} dispatch={dispatch} />
                </Col>
              </Row>
              <Row className="justify-content-center mt-4">
                <Col>
                  {formState.success.message === "" ? null : (
                    <Success
                      message={formState.success.message}
                      dispatch={dispatch}
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  {formState.error.message === "" ? null : (
                    <Error
                      message={formState.error.message}
                      dispatch={dispatch}
                    />
                  )}
                </Col>
              </Row>
              <Row className="justify-content-center my-5">
                <Col xs={1}>
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className={
                      formState.success.message === ""
                        ? "button-style"
                        : "visually-hidden"
                    }
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </>
          ) : null}
        </Form>
      </Container>
    </>
  );
}

export default App;
