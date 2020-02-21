const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const blog = require('../routes/blog');

app.use(cors());
app.use(bodyParser.json());

app.use('/api', blog);

module.exports = app;
