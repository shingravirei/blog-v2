const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandler } = require('./middleware');
const blogRouter = require('../routes/blog');
const usersRouter = require('../routes/users');

app.use(cors());
app.use(bodyParser.json());

app.use('/api', blogRouter);
app.use('/api', usersRouter);

app.use(errorHandler);

module.exports = app;
