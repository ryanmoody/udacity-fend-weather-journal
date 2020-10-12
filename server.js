// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// Get all data
app.get('/all', (req, res) => {
  res.send(projectData);
});

// Get entry by id
app.get('/entry/:id', (req, res) => {
  res.send(projectData[req.params.id]);
});

// Post new data
app.post('/add', (req, res) => {
  const { body } = req;
  projectData[body.id] = body;
  res.send(projectData[body.id]);
});
