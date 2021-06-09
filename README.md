# Invoice Generator

Invoice Generator retrieves a list of available products and services from the Staxx demo API `item` resource and allows a user to add them to an invoice along with a memo which then can be submitted to the `invoice` resource.

## Installation

Requires the package manager [npm](https://www.npmjs.com/) to install Invoice Generator as well as [node](https://nodejs.org) version 14.15.4 or higher.

Make a clone of this repo or fork it.

Next, execute the following code in your terminal (Example is Bash):

```bash
npm install
```

Change directory into the `client/` subfolder and also run `npm install`.

## Description

Invoice Generator is an application utilizing React on the frontend and Node/Express on the backend. This application was built with a backend proxy to interact with the Staxx API.

The folder structure is as follows.

```
/
  server.js
  utils/
  ...etc
  client/
    ...React application
```

## Usage

Initiate development proxy server from the root directory using `nodemon server`.
The frontent development server is run by `cd client` then `npm start`.

This app requires authorization via tokens passed in the HTML request headers. In order to utilize the API, you must obtain the token from the Staxx Human Resources department, create a `.env` file, add the token, then reference it in `server.js` with the app routes.

For example,

```Javascript
app.get('/api/item', cors(corsOptions), async (req, res) => {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    };
```

### Ports

#### Express

5000

#### React

3000

Be aware of CORS policy violations. Edit the corresponding code to ensure the proxy server will accept HTTP requests.

```Javascript
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
```

### Backend Validation

This app utilizes `express-validator` for data validation on the request body. In addition to this there is a custom data validation function `validateLineItems()` that is used to validate incoming data from the API. Though I had plans to update the UI, I decided to leave the error handling to just console.logs. Feel free to write your own custom error handling.

### Currency Calculations

You can find within respective `utils/` folders for both server and client, a `helper.js` file which contains many functions utilized in the app including coverting currency values from strings, to numbers, and cents to prevent rounding errors. Be on the lookout when modifying anything that calculates the totals.

## Frontend

The frontend was created using `create-react-app`.

### Structure

The main point to know about the component structure is what the components are in change of and how state is handled.

#### App

In charge of fetching API data from the `item` resource via the `useEffect()` hook to trigger the rendering of the entire application, constructing the `<AddItems>` products and services list, and maintaining the state of the entire `<Form>`.

#### Header

Displays static html and has no state.

#### AddItems

Takes the API data fetched from the `item` resource and renders a list of `<Item>`.

#### Item

This is the only child component of `<App>` that maintains its own state. This is so the item can be edited and dispatched to `<App>` which will render the added line item into `<ItemList>`.

#### Memo

Simple component holding a `<textarea>` element along with dispatch ability.

#### Totals

Displays totals calculated from `<App>`.

#### Error & Success

Both components are similar in logic. Whenever there is an error or success message within the `<App>` state, they are conditionally rendered by `<App>` with the message passed down as a prop.

## State Management

Form data is managed by `<App>` with `useReducer()` and child components are given ability to update state with `dispatch` being passed down as a prop.

### Styling

This was style using `react-bootstrap`. Those components are built into the structure, so changing to a different CSS styling strategy would require a lot of reworking.

## Clean Code

I made my best effort to keep the components as lean as possible by offloading functions to `/client/utils/helper.js`. I hope that this makes it easier for you to navigate and debug.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
