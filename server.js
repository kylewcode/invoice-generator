require("dotenv").config();
const lineItemsSeed = require("./seeds/seed");

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const cors = require("cors");

const corsOptions = {
  origin: "https://kylewcode-invoice-generator.netlify.app",
  // origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.options("/api/invoice", cors(corsOptions));

app.use(bodyParser.json());

// @method        GET
// @description   Fetches all line items details/price for the merchant's catalog.
// @access        Public
app.get("/api/item", cors(corsOptions), async (req, res) => {
  try {
    // NOTE: Authorization to 3rd party API was temporary. Now that the token is no longer valid, I've commented out the code that
    // interacts with it. In place I have passed lineItemsSeed to the response which mimics the data that was fetched from the 3rd party API.

    /* Expected data structure is an array of one or more objects with the following data structure:
      {
        details: String,
        price: Number,
        quantity: Number,
        total: Number
      }
    */

    // Code to inteact with 3rd party API.
    /*
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    };

    const ThirdPartyAPIResponse = await axios.get(
      'https://api.qd.fattpay.com/item',
      options
    );

    const merchantCatalog = ThirdPartyAPIResponse.data.data;

    const prunedMerchantCatalog = merchantCatalog.map(item => {
      const result = {};
      result.details = item.details;

      // Need to count for inaccuracy of floating point number type in Javascript
      result.price = preventPriceCalculationErrors(item.price);

      result.quantity = 1;

      // Calculations must be converted back to dollar decimal currency format
      result.total = (result.price * result.quantity) / 100;
      result.price = result.price / 100;

      return result;
    });

    if (validateLineItems(prunedMerchantCatalog)) {
      console.log('Catalog validated.');
      return res.json(prunedMerchantCatalog);
    }
    res
      .status(500)
      .send(
        'An external service has returned unusable data. Please contact administrator for assistance.'
      );
    */

    res.send(lineItemsSeed);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @method        POST
// @description   Creates a new invoice for the given customer
// @access        Public
app.post(
  "/api/invoice",
  cors(corsOptions),
  body("customer_id")
    .trim()
    .blacklist(/\[<>&'"\/\]/)
    .isLength({ min: 36, max: 36 }),
  body("meta.subtotal").trim().isNumeric(),
  body("meta.tax").trim().isNumeric(),
  body("meta.lineItems").isArray(),
  body("meta.lineItems.*").isObject(),
  body("meta.lineItems.*.id")
    .trim()
    .isString()
    .blacklist(/\[<>&'"\/\]/),
  body("meta.lineItems.*.item")
    .trim()
    .isString()
    .blacklist(/\[<>&'"\/\]/),
  body("meta.lineItems.*.details")
    .trim()
    .isString()
    .blacklist(/\[<>&'"\/\]/),
  body("meta.lineItems.*.quantity").trim().isNumeric(),
  body("meta.lineItems.*.price").trim().isNumeric(),
  body("total").trim().isNumeric(),
  body("url").trim().isURL({ require_protocol: true }),
  body("send_now").isBoolean(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const requestBody = req.body;

      // Code to inteact with 3rd party API.
      /*
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      };

      await axios.post(
        'https://api.qd.fattpay.com/invoice',
        requestBody,
        options
      );

      res.status(200).send('Invoice Submitted');
      */
      res.status(200).json(requestBody);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
