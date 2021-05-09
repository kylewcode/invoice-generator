require('dotenv').config();

const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const axios = require('axios');
const { body, validationResult } = require('express-validator');

app.use(bodyParser.json());

const { preventPriceCalculationErrors, validateLineItems } = require('./utils/helper');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// @method        GET
// @description   Fetches all line items details/price for the merchant's catalog.
// @access        Public
app.get('/api/item', async (req, res) => {
  try {
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
      console.log('Catalog validated.')
      return res.json(prunedMerchantCatalog);
    }
    res.status(500).send('An external service has returned unusable data. Please contact administrator for assistance.');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @method        POST
// @description   Creates a new invoice for the given customer
// @access        Public
app.post(
  '/api/invoice',
  body('customer_id').trim().blacklist(/\[<>&'"\/\]/).isLength({ min: 36, max: 36 }),
  body('meta.subtotal').trim().isCurrency(),
  body('meta.tax').trim().isCurrency(),
  body('meta.lineItems').isArray(),
  body('meta.lineItems.*').isObject(),
  body('meta.lineItems.*.id').trim().isString().blacklist(/\[<>&'"\/\]/),
  body('meta.lineItems.*.item').trim().isString().blacklist(/\[<>&'"\/\]/),
  body('meta.lineItems.*.details').trim().isString().blacklist(/\[<>&'"\/\]/),
  body('meta.lineItems.*.quantity').trim().isNumeric(),
  body('meta.lineItems.*.price').trim().isCurrency(),
  body('total').trim().isCurrency(),
  body('url').trim().isURL({ require_protocol: true }),
  body('send_now').isBoolean(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const requestBody = req.body;

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
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
