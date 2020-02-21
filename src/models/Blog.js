const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config/env-vars');

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.model('Blog', blogSchema);
