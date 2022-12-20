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
  // Origin for local development.
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
