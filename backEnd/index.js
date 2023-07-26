const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5003;
const axios = require('axios');
const cors = require('cors');
const path = require("path")

app.use(bodyParser.json());

app.use(cors());

let accessToken = "";
let tokenExpiration = 0; 

const apiUrl = "http://20.244.56.144/train/auth";
const refreshTokenInterval = 100000; // Interval in milliseconds

// Function to refresh the token by making a POST request
async function refreshToken() {
  try {
    const response = await axios.post(apiUrl, {
        companyName: "Jayesh Central",
        clientID: "06347a23-6be0-4b03-9eb3-d865c39ae896",
        clientSecret: "EqilDvQPIqJLwOqG",
        ownerName: "Jayesh",
        ownerEmail: "jayesh.cs20@bitsathy.ac.in",
        rollNo: "201CS183"
    });
    if (response.data && response.data.access_token && response.data.expires_in) {
      accessToken = response.data.access_token;
      console.log(accessToken);
      tokenExpiration = Date.now() + (response.data.expires_in * 1000);
      console.log("Token refreshed successfully."); 
    }
  } catch (error) {
    console.error('Error refreshing token:', error.message);
  }
}

// Initial token retrieval and refresh
refreshToken();
//to refresh the Token bases on expiry interval
setInterval(refreshToken, refreshTokenInterval);

// Middleware to check token expiration before every request to /train route
function checkTokenExpiration(req, res, next) {
  if (Date.now() >= tokenExpiration) {
    refreshToken();
  }
  next();
}



app.get('/train', checkTokenExpiration, (req, res) => {
    const API_URL = "http://20.244.56.144/train/trains";
  
    axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        res.send(response.data);
        console.log(response.data.length)
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Error fetching data from the API.');
      });
  });

  // to fetch the train details
  app.get('/train/:id', checkTokenExpiration, (req, res) => {
    const API_URL = `http://20.244.56.144/train/trains/${req.params.id}`;
  
    axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        res.status(500).send(`Error fetching data of the train 
        . Kindly CHECK the Train Number`);
      });
  });
  
  app.get('*', (req, res) => {
    const errorFilePath = path.join(__dirname, '404.html');
    res.status(404).sendFile(errorFilePath);
  });



app.listen(port, () => console.log(`Listening on port ${port}`));