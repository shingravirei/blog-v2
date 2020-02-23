const Router = require('express').Router();
const Blog = require('../models/Blog');

Router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({});

        res.json(blogs);
    } catch (err) {
        console.log('Error:', err);
        res.status(400).end();
    }
});

Router.post('/blogs', async (req, res) => {
    try {
        let { title, author, url, likes } = req.body;

        if (typeof title === 'undefined' || typeof url === 'undefined') {
            return res.status(400).end();
        }

        if (typeof likes === 'undefined') {
            likes = 0;
        }

        const blog = new Blog({ title, author, url, likes });

        const result = await blog.save();

        res.status(201).json(result);
    } catch (err) {
        console.log('Error', err);
        res.status(400).end();
    }
});

Router.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await Blog.findByIdAndDelete({ _id: id });

        res.status(204).end();
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
});

Router.put('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, url, likes } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, author, url, likes },
            { new: true }
        );

        res.json(updatedBlog);
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
});

module.exports = Router;
