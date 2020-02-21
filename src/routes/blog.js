const Router = require('express').Router();
const Blog = require('../models/Blog');

Router.get('/blogs', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs);
    });
});

Router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then(result => {
        res.status(201).json(result);
    });
});

module.exports = Router;
