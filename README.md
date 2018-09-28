# MockarooWebdriverio

Basic structure for the integration of Mockaroo with Webdriverio for E2E Testing tutorial.

[Tutorial Link](https://testerink.gitbook.io/taller7/)

## Install Dependencies

In the root project run the following command:

```
npm install
```

## Setup Mockaroo credentials

Go to the file **test/specs/losestudiantes.spec.js** and change the word YOUR_API_KEY in line 16 with your api key.

```javascript
var client = new Mockaroo.Client({
   apiKey: YOUR_API_KEY
})
```

## Run Tests

In the root project run the following command:

```
npm test
```
