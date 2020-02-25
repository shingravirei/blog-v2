const Router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

Router.get('/users', async (req, res, next) => {
    try {
        const users = await User.find({}).populate('blogs', {
            title: 1,
            url: 1,
            author: 1
        });

        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
});

Router.post('/users', async (req, res, next) => {
    const { name, username, password } = req.body;

    try {
        if (!name || !username || !password) {
            throw new Error(
                'Post request must contain name, username and password'
            );
        }

        if (password.length < 8) {
            throw new Error('Password must have at least 8 characters');
        }
        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({ name, username, password: hash });

        const result = await newUser.save();

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

module.exports = Router;
