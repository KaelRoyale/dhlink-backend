'use strict';
require('dotenv').config()
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(), helmet())
app.use(bodyParser.json())

const routes = require('./routes/router')
const router = express.Router();
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
app.use('/api', Router)
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
