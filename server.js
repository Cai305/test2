const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
var request = require('request');
var cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configuration (replace with your actual values)
// Configuration using environment variables
const authUrl = process.env.AUTH_URL;
const paymentUrl = process.env.PAYMENT_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
var location;


var https = require('follow-redirects').https;
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  
var Results_object;
var username1 = 'africanbankcms';
passw = 'VLDWzM5d5J!qnDhkFfV09';


var HTMLParser = require('node-html-parser');
 


// Middleware to parse JSON bodies
app.use(bodyParser.json());
// var options = {
//   'method': 'GET',
//   'url': 'https://auth.uat.api.bidvestdata.co.za/v1/token',
//   'headers': {
//     'Authorization' : 'Basic ' + new Buffer(username1 + ':' + passw). toString('base64')
//   },
//   'agent': httpsAgent
// };



// request(options, function (error, auth_Results) {
//   if (error) throw new Error(error);
//   Results_object =  JSON.parse(auth_Results.body);
//   console.log(JSON.stringify(auth_Results.body));
//   token = Results_object.Token

//   const paymentData =  {
//     chargeTotal: 5.6,
//     invoicenumber: 'Inv1',
//     customerId: 'Cust1',
//     responseSuccessURL: 'https://fdr.dev.api.bidvestdata.co.za/v1/success5',
//     responseFailURL: 'https://fdr.dev.api.bidvestdata.co.za/v1/fail5',
// };



//   var options2 = {
//     'method': 'POST',
//     'url': 'https://fdr.uat.api.bidvestdata.co.za/v1',
//     'headers': {
//       'Token' : token,
//       'Content-Type': 'application/json',
//     },
//     'agent': httpsAgent,
//     body: JSON.stringify({
//     chargeTotal: "5.00",
//     invoicenumber: "Inv1",
//     customerId: "Cust1",
//     responseSuccessURL: "https://fdr.dev.api.bidvestdata.co.za/v1/success5",
//     responseFailURL: "https://fdr.dev.api.bidvestdata.co.za/v1/fail5"
//   }),
//   };


//   request(options2, function (error, auth_response) {
//     if (error) throw new Error(error);
//     // let payment_object =  (auth_response);
//     console.log(HTMLParser.parse(auth_response.body));
//     console.log(auth_response.headers)
  
//     // token = Results_object.Token
//   });
// });








// // Helper function to get the token
// async function getToken() {
//     return Results_object.Token
// }


// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Set custom CSP header
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-eval'");
  next();
});

var options = {
    'method': 'GET',
    'url': 'https://auth.uat.api.bidvestdata.co.za/v1/token',
    'headers': {
      'Authorization' : 'Basic ' + new Buffer(username1 + ':' + passw). toString('base64')
    },
    'agent': httpsAgent
  };
  
  
  
  request(options, function (error, auth_Results) {
    if (error) throw new Error(error);
    Results_object =  JSON.parse(auth_Results.body);
    // console.log(JSON.stringify(auth_Results.body));
    token = Results_object.Token
  
    const paymentData =  {
      chargeTotal: 5.6,
      invoicenumber: 'Inv1',
      customerId: 'Cust1',
      responseSuccessURL: 'https://fdr.dev.api.bidvestdata.co.za/v1/success5',
      responseFailURL: 'https://fdr.dev.api.bidvestdata.co.za/v1/fail5',
  };


  
  
  
    var options2 = {
      'method': 'POST',
      'url': 'https://fdr.uat.api.bidvestdata.co.za/v1',
      'headers': {
        'Token' : token,
        'Content-Type': 'application/json',
      },
      'agent': httpsAgent,
      body: JSON.stringify({
      chargeTotal: "5.00",
      invoicenumber: "Inv1",
      customerId: "Cust1",
      responseSuccessURL: "https://fdr.dev.api.bidvestdata.co.za/v1/success5",
      responseFailURL: "https://fdr.dev.api.bidvestdata.co.za/v1/fail5"
    }),
    };
  
  
    request(options2, function (error, auth_response) {
      if (error) throw new Error(error);
      // let payment_object =  (auth_response);
    //   let headerNew = auth_response.headers
      
      location = auth_response.headers.location;
      // token = Results_object.Token
    });
  });
// Endpoint to make a payment
app.post('/makePayment', async (req, res) => {
  const paymentData = req.body;
  console.log(location);
  try {

    if(location){
        res.status(200).json({location:location});

    }
 


    
  } catch (error) {
    console.error('Payment error:', error.message);
    res.status(500).json({ error: 'Failed to make payment' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});